import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getZaps, loadTargetData } from '../utils/data'
import { TYPE_ZAP, cancelZap, nostr } from '../../../modules/nostr'
import { ZAP_STATUS } from '../../../utils/constants/general'
import { formatSats } from '../../../utils/helpers/general'
import { Notification } from '../../../components/Notification'

export const useLoadZaps = (type = TYPE_ZAP, amount = 0, comment = '') => {
   const [searchParams, setSearchParams] = useSearchParams()

   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState('')
   const [isLoaded, setIsLoaded] = useState(false)

   // params
   const id = searchParams.get('id') || ''
   const [wasAutoSend, setWasAutoSend] = useState(false)

   // single target event or relay-info
   const [target, setTarget] = useState(null)

   // several zap-split targets
   const [targetPubkeyWeights, setTargetPubkeyWeights] = useState([])
   const [relays, setRelays] = useState([])
   const [metas, setMetas] = useState([])
   const [zaps, setZaps] = useState([])

   // UI state
   const [logs, setLogs] = useState('')
   const [autoSendTimer, setAutoSendTimer] = useState(0)
   const [currentZapIndex, setCurrentZapIndex] = useState(-1)
   const [showDone, setShowDone] = useState(false)
   const timerRef = useRef()

   const updateAutoSendTimer = (sec) => {
      setAutoSendTimer(sec)
      timerRef.current = setTimeout(() => {
         if (sec > 1) {
            updateAutoSendTimer(sec - 1)
         } else {
            setAutoSendTimer(0)
            emitSend()
         }
      }, 1000)
   }

   const cancelAutoSend = () => {
      if (timerRef.current || timerRef.current === 0)
         clearTimeout(timerRef.current)
      setAutoSendTimer(0)
   }

   // read params from query string
   useEffect(() => {
      const autoSend = searchParams.get('auto_send') === 'true'
      if (autoSend) setWasAutoSend(true)
   }, [searchParams])

   // launch the auto-send
   useEffect(() => {
      if (wasAutoSend) {
         // make sure we drop the auto-send param and don't let it be returned to
         searchParams.delete('auto_send')
         setSearchParams(searchParams, { replace: true })
      }
   }, [wasAutoSend])

   // load the target if id changes
   useEffect(() => {
      const load = async () => {
         const zapId = id || searchParams.get('id')
         if (!zapId) return setError('Specify id')

         try {
            setIsLoaded(false)
            setError('')
            setIsLoading(true)
            const response = await loadTargetData(id)
            const { targets, targetEvent, relays, metas } = response
            setMetas(metas)
            setTargetPubkeyWeights(targets)
            setRelays(relays)
            if (targetEvent) setTarget(targetEvent)
            setIsLoading(false)
            setIsLoaded(true)
         } catch (error) {
            setError(error.message)
            setIsLoading(false)
         }
         return null
      }
      load()
   }, [id])

   useEffect(() => {
      return () => {
         setIsLoaded(false)
         setIsLoading(false)
      }
   }, [])

   // recalculate the zap array if amount or targets change
   useEffect(() => {
      const update = async () => {
         try {
            const zaps = await getZaps(
               target,
               targetPubkeyWeights,
               relays,
               metas,
               type,
               amount,
               comment
            )
            setZaps(zaps)
            if (amount > 0 && zaps.length > 0 && wasAutoSend) {
               // set the timer
               updateAutoSendTimer(3)
               setWasAutoSend(false)
            }
         } catch (error) {
            setError(error.message)
         }
      }

      if (metas.length > 0 && targetPubkeyWeights.length > 0) update() // recalc
   }, [target, targetPubkeyWeights, metas, amount, type, comment])

   const emitSend = () => {
      setTimeout(() => document.getElementById('send').click(), 0)
   }

   const log = (s) => {
      setLogs((prev) => `${prev}\n${s}`)
   }

   const updateZap = (zap) => {
      const copy = { ...zap }
      setZaps((prev) => {
         prev.splice(zap.index, 1, copy)
         return [...prev]
      })
   }

   const sendZap = async (zap) => {
      setCurrentZapIndex(zap.index)
      // sends if has webLN, or just fetches invoices etc
      // if need to send manually
      const r = await nostr.sendZap(zap, log, updateZap)
      if (zap.status === ZAP_STATUS.DONE)
         toast.custom((t) => {
            return (
               <Notification
                  message={`Sent ${formatSats(zap.amount)} sats`}
                  onDismiss={() => toast.remove(t.id)}
                  type="success"
               />
            )
         })
      return r
   }

   const sendNextZap = async () => {
      const zap = zaps.find((z) => !z.status)
      if (!zap) {
         setCurrentZapIndex(-1)
         setShowDone(zaps.length > 0)
         return
      }
      await sendZap(zap)
      // auto-sending next one
      if (
         !zap.cancelled &&
         (zap.status === ZAP_STATUS.DONE || zap.status === ZAP_STATUS.ERROR) &&
         nostr.hasWebLN()
      ) {
         emitSend()
      }
   }

   const restartFailedZaps = () => {
      setZaps((prev) => {
         return prev.map((z) => {
            if (z.status !== ZAP_STATUS.DONE) z.status = ''
            return z
         })
      })
      sendNextZap()
   }

   const currentZap = currentZapIndex >= 0 ? zaps[currentZapIndex] : null

   const cancelCurrentZap = () => {
      if (
         currentZap.status !== ZAP_STATUS.DONE &&
         currentZap.status !== ZAP_STATUS.ERROR &&
         currentZap.status !== ZAP_STATUS.WAITING &&
         !currentZap.cancelled
      ) {
         cancelZap()
      } else {
         setCurrentZapIndex(-1)
      }
   }

   const doneCurrentZap = () => {
      currentZap.status = ZAP_STATUS.DONE
      updateZap(currentZap)
      // only go to next one if it's our first pass
      // and we still have non-tried receivers
      if (zaps.find((z) => !z.status)) sendNextZap() // next one
      else if (zaps.length === 1) cancelCurrentZap() // close the modal
   }

   const handleHideSuccessModal = () => {
      setShowDone(false)
   }

   const restartZap = useCallback((zap) => {
      if (zap.status === ZAP_STATUS.DONE) return
      zap.status = ''
      updateZap(zap)
      sendZap(zap)
   }, [])

   const memoizedZaps = useMemo(() => zaps, [zaps])

   return {
      isLoading,
      error,
      zaps: memoizedZaps,
      target,
      sendNextZap,
      doneCurrentZap,
      cancelCurrentZap,
      currentZap,
      logs,
      autoSendTimer,
      cancelAutoSend,
      showDone,
      handleHideSuccessModal,
      restartFailedZaps,
      restartZap,
      isLoaded,
   }
}
