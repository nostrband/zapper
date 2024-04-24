import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getZaps, loadTargetData } from '../utils/data'

export const useLoadZaps = (
   id = '',
   type = 'zap',
   amount = 0,
   comment = ''
) => {
   const [searchParams] = useSearchParams()

   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState('')

   // single target event or relay-info
   const [target, setTarget] = useState(null)

   // several zap-split targets
   const [targetPubkeyWeights, setTargetPubkeyWeights] = useState([])
   const [relays, setRelays] = useState([])
   const [metas, setMetas] = useState([])

   const [zaps, setZaps] = useState([])

   // load the target if id changes
   useEffect(() => {
      const load = async () => {
         const zapId = id || searchParams.get('id')
         try {
            setError('')
            setIsLoading(true)
            const response = await loadTargetData(zapId)
            const { targets, targetEvent, relays, metas } = response
            setMetas(metas)
            setTargetPubkeyWeights(targets)
            setRelays(relays)
            if (targetEvent) setTarget(targetEvent)
         } catch (error) {
            setError(error.message)
         } finally {
            setIsLoading(false)
         }
      }
      load()
   }, [id])

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
            // if (amount > 0 && zaps.length > 0 && wasAutoSend) {
            //    // set the timer
            //    updateAutoSendTimer(3)
            //    setWasAutoSend(false)
            // }
         } catch (error) {
            setError(error.message)
         }
      }

      if (metas.length > 0 && targetPubkeyWeights.length > 0) update() // recalc
   }, [target, targetPubkeyWeights, metas, amount, type, comment])

   useEffect(() => {
      setIsLoading(false)
      setError('')
   }, [])

   return {
      isLoading,
      error,
      zaps,
      target,
   }
}
