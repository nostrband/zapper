import { useState, useEffect } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { CaretDown } from 'react-bootstrap-icons'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { nip19 } from '@nostrband/nostr-tools'
import {
   nostr,
   TYPE_ZAP,
   TYPE_ANON_ZAP,
   TYPE_SEND_SATS,
} from '../../modules/nostr'
import { Tabs } from '../Tabs/Tabs'
import { Event } from './components/Event'
import { Recipients } from './components/Recipients'
import { formatSats } from '../../utils/helpers/general'
import { TABS } from './constants'
import { getHeadingByTab } from './helpers'
import {
   AmountModal,
   AutoZapModal,
   CommentModal,
   SuccessModal,
   ZapModal,
} from '../Modal'

function ZapForm() {
   const [searchParams, setSearchParams] = useSearchParams()

   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState('')

   // single target event or relay-info
   const [target, setTarget] = useState(null)

   // several zap-split targets
   const [targetPubkeyWeights, setTargetPubkeyWeights] = useState([])
   const [relays, setRelays] = useState([])
   const [metas, setMetas] = useState([])
   const [zaps, setZaps] = useState([])

   // params
   const [id, setId] = useState('')
   const [amount, setAmount] = useState(0)
   //  const [amountValues, setAmountValues] = useState([]);
   const [type, setType] = useState('zap')
   const [comment, setComment] = useState('')
   const [wasAutoSend, setWasAutoSend] = useState(false)
   // eslint-disable-next-line no-unused-vars
   const [closeOnSend, setCloseOnSend] = useState(false)

   // UI state
   const [logs, setLogs] = useState('')
   const [autoSendTimer, setAutoSendTimer] = useState(0)
   const [timerId, setTimerId] = useState(undefined)
   const [currentZapIndex, setCurrentZapIndex] = useState(-1)

   // controls
   const [showAmountPicker, setShowAmountPicker] = useState(false)
   const [showCommentPicker, setShowCommentPicker] = useState(false)
   const [showLogs, setShowLogs] = useState(false)
   const [showDone, setShowDone] = useState(false)

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

   const emitSend = () => {
      setTimeout(() => document.getElementById('send').click(), 0)
   }

   const sendZap = async (zap) => {
      setCurrentZapIndex(zap.index)

      // sends if has webLN, or just fetches invoices etc
      // if need to send manually
      const r = await nostr.sendZap(zap, log, updateZap)
      if (zap.status === 'done')
         toast.success(`Sent ${formatSats(zap.amount)} sats`)
      return r
   }

   const restartZap = (zap) => {
      if (zap.status === 'done') return

      zap.status = ''
      updateZap(zap)
      sendZap(zap)
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
         (zap.status === 'done' || zap.status === 'error') &&
         nostr.hasWebLN()
      ) {
         emitSend()
      }
   }

   const currentZap = currentZapIndex >= 0 ? zaps[currentZapIndex] : null

   const doneCurrentZap = () => {
      currentZap.status = 'done'
      updateZap(currentZap)
      // only go to next one if it's our first pass
      // and we still have non-tried receivers
      if (zaps.find((z) => !z.status)) sendNextZap() // next one
   }

   const updateAutoSendTimer = (sec) => {
      setAutoSendTimer(sec)
      const to = setTimeout(() => {
         if (sec > 1) {
            updateAutoSendTimer(sec - 1)
         } else {
            setAutoSendTimer(0)
            emitSend()
         }
      }, 1000)

      setTimerId(to)
   }

   const cancel = () => {
      if (timerId) clearTimeout(timerId)
      setTimerId(undefined)
      setAutoSendTimer(0)
   }

   // read params from query string
   useEffect(() => {
      const id = searchParams.get('id')
      setId(id)

      const amount = Number(searchParams.get('amount') || 0)
      setAmount(amount)

      //    const newAmountValues = (searchParams.get("amount_values") || "")
      //      .split(',')
      //      .map(v => v !== "" ? Number(v) : undefined)
      //      .filter(v => v !== undefined);
      //    if (!arrayEquals(amountValues, newAmountValues))
      //      setAmountValues(newAmountValues);

      const zapType = searchParams.get('type') || 'zap'
      setType(zapType)

      const comment = searchParams.get('comment') || ''
      setComment(comment)

      const closeOnSend = searchParams.get('close_on_send') === 'true'
      setCloseOnSend(closeOnSend)

      const autoSend = searchParams.get('auto_send') === 'true'
      if (autoSend) setWasAutoSend(true)
   }, [searchParams])

   // load the target if id changes
   useEffect(() => {
      const load = async () => {
         if (!id) {
            if (!searchParams.get('id')) setError('Specify id')
            return
         }

         const targets = []
         let target = ''
         let relays = []
         const { type: idType, data } = nip19.decode(id)
         switch (idType) {
            case 'npub':
               targets.push({
                  pubkey: data,
                  weight: 1.0,
               })
               break

            case 'nprofile':
               targets.push({
                  pubkey: data.pubkey,
                  weight: 1.0,
               })
               relays = data.relays || []
               break

            case 'note':
               target = data
               break

            case 'nevent':
               target = data.id
               relays = data.relays || []
               break

            case 'naddr':
               target = `${data.kind}:${data.pubkey}:${data.identifier}`
               relays = data.relays || []
               break

            case 'nrelay':
               target = data
               break

            default:
               setError(`Bad id ${id}`)
               return
         }
         relays = relays.filter((r) => r !== '')

         let ndk = await nostr.getNDK(relays)

         let targetEvent = null
         if (target !== '') {
            if (target.toLowerCase().startsWith('wss://')) {
               setError('Nrelay not supported yet')
               return
               // FIXME get relay info
            }
            if (target.includes(':')) {
               targetEvent = await nostr.fetchEventByAddr(ndk, target)
               if (!targetEvent) {
                  setError(`Failed to fetch target event by addr ${target}`)
                  return
               }
            } else {
               targetEvent = await nostr.fetchEventById(ndk, target)
               if (!targetEvent) {
                  setError(`Failed to fetch target event by id ${target}`)
                  return
               }
            }
         }

         // check zap tags of the target event for zap-split logic
         if (targetEvent) {
            const tags = targetEvent.tags.filter(
               (t) => t.length >= 2 && t[0] === 'zap'
            )
            if (tags.length) {
               // collect zap-split targets
               tags.forEach((z) => {
                  // collect relays
                  if (z.length >= 3 && z[2] !== '') relays.push(z[2])

                  const pubkey = z[1]
                  const weight = z.length >= 4 ? Number(z[3]) : 0.0
                  targets.push({ pubkey, weight })
               })

               // all weights are zero
               if (!targets.find((t) => t.weight > 0.0))
                  targets.forEach((z) => {
                     z.weight = 1.0
                  }) // set equal weights

               // make sure ndk connects to these relays too
               ndk = await nostr.getNDK(relays)
            } else {
               targets.push({
                  pubkey: targetEvent.pubkey,
                  weight: 1.0,
               })
            }
         }

         // no targets? we're done
         if (targets.length === 0) {
            setError('No zap target found')
            return
         }

         setTargetPubkeyWeights(targets)
         setRelays(relays)

         const pubkeys = targets.map((pw) => pw.pubkey)
         if (targetEvent) pubkeys.push(targetEvent.pubkey)

         const metas = await nostr.fetchMetas(ndk, pubkeys)
         setMetas(metas)
         // eslint-disable-next-line no-console
         console.log('metas', metas)

         if (targetEvent)
            targetEvent.meta = metas.find(
               (m) => m.pubkey === targetEvent.pubkey
            )

         setTarget(targetEvent)
      }

      setIsLoading(true)
      setError('')

      load()
         .catch(setError)
         .finally(() => {
            setIsLoading(false)
         })
   }, [id])

   // recalculate the zap array if amount or targets change
   useEffect(() => {
      const update = async () => {
         const ndk = await nostr.getNDK([])
         const totalWeight = targetPubkeyWeights.reduce((total, pw) => {
            total += pw.weight
            return total
         }, 0)
         const zaps = targetPubkeyWeights.map((pw, index) => {
            const weight = pw.weight / totalWeight
            const msats = Math.floor(1000 * amount * weight)
            const zap = nostr.createZap(ndk, {
               amount,
               comment,
               relays,
               msats,
               pubkey: pw.pubkey,
               target,
            })

            const meta = metas.find((m) => m.pubkey === pw.pubkey)

            return {
               index,
               zap,
               weight,
               meta,
               type,
               pubkey: pw.pubkey,
               amount: msats,
               comment,
               status: '',
            }
         })

         if (zaps.length > 0) {
            // eslint-disable-next-line no-console
            console.log('zaps', zaps)
            setZaps(zaps)
         }

         return zaps
      }

      if (metas.length > 0 && targetPubkeyWeights.length > 0) {
         // recalc
         update()
            .then((zaps) => {
               if (amount > 0 && zaps.length > 0 && wasAutoSend) {
                  // set the timer
                  updateAutoSendTimer(3)
                  setWasAutoSend(false)
               }
            })
            .catch(setError)
      }
   }, [target, targetPubkeyWeights, metas, amount, type, comment])

   // launch the auto-send
   useEffect(() => {
      if (wasAutoSend) {
         // make sure we drop the auto-send param and don't let it be returned to
         const params = new URLSearchParams(searchParams.toString())
         params.delete('auto_send')
         setSearchParams(params, { replace: true })
      }
   }, [wasAutoSend])

   if (error) {
      return (
         <div>
            <h4>Error</h4>
            <div>{error}</div>
            <Button onClick={() => window.location.reload()}>Retry</Button>
         </div>
      )
   }

   const isNewZap = !zaps.find((z) => z.status)
   let status = ''
   if (!isNewZap) {
      const paid = zaps.reduce((total, zap) => {
         return total + (zap.status === 'done' ? zap.amount : 0)
      }, 0)
      const done = zaps.filter((z) => z.status === 'done').length
      //		const todo = zaps.filter(z => !z.status).length;
      const error = zaps.filter((z) => z.status === 'error').length
      const todo = done === zaps.length ? done : `${done}/${zaps.length}`
      status = `Sent ${formatSats(paid)} sats to ${todo} recipients`
      if (error) status += `, ${error} errors`
   }

   let label = ''
   if (!amount) {
      label = 'Specify amount first'
   } else {
      switch (type) {
         case TYPE_ZAP:
         case TYPE_ANON_ZAP:
            label = 'Zap'
            break
         case TYPE_SEND_SATS:
            label = 'Send'
            break
         default:
            break
      }
      label += ` ${amount} sats`
      if (zaps.length > 1) label += ` to ${zaps.length} recipients`
   }

   const hasErrors = !!zaps.find((z) => z.status === 'error')

   const showCommentField = type !== TYPE_SEND_SATS

   return (
      <div>
         <Tabs
            onTabChange={(tab) => setType(tab)}
            tabs={TABS}
            activeTab={type}
         />
         <p>{getHeadingByTab(type)}</p>

         <Form>
            <h4>Amount</h4>

            <InputGroup className="mb-3">
               <Form.Control
                  placeholder="Enter or pick amount"
                  aria-label="Enter or pick amount"
                  aria-describedby="pick-amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
               />
               <Button
                  variant="outline-secondary"
                  id="pick-amount"
                  onClick={() => setShowAmountPicker(true)}
               >
                  <CaretDown /> Pick
               </Button>
            </InputGroup>

            {showCommentField && (
               <>
                  <h4>Comment</h4>

                  <InputGroup className="mb-3">
                     <Form.Control
                        placeholder="Enter or pick comment (optional)"
                        aria-label="Enter or pick comment (optional)"
                        aria-describedby="pick-comment"
                        as="textarea"
                        rows={1}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                     />
                     <Button
                        variant="outline-secondary"
                        id="pick-comment"
                        onClick={() => setShowCommentPicker(true)}
                     >
                        <CaretDown /> Pick
                     </Button>
                  </InputGroup>
               </>
            )}
         </Form>

         {isLoading && <h4>Loading...</h4>}

         {target && target.id && <Event target={target} />}

         <Recipients
            isNewZap={isNewZap}
            onRestartZaps={(z) => restartZap(z)}
            zaps={zaps}
         />

         {!isLoading && isNewZap && (
            <div className="mt-3">
               <h4>Confirm</h4>
               <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={sendNextZap}
                  disabled={!amount || !zaps.length}
               >
                  {label}
               </Button>
            </div>
         )}

         {!isNewZap && (
            <div className="mt-3">
               <h4>{status}</h4>
            </div>
         )}

         <div
            className="d-none"
            id="send"
            role="button"
            onClick={sendNextZap}
         />

         <AmountModal
            show={showAmountPicker}
            onHide={() => setShowAmountPicker(false)}
            onPickAmount={(newAmount) => setAmount(newAmount)}
            pickedAmount={amount}
         />

         <CommentModal
            show={showCommentPicker}
            onHide={() => setShowCommentPicker(false)}
            pickedComment={comment}
            onPickComment={(newComment) => setComment(newComment)}
         />

         <AutoZapModal show={autoSendTimer > 0} onHide={cancel} />

         <SuccessModal
            show={showDone}
            onHide={() => setShowDone(false)}
            hasErrors={hasErrors}
         />

         {currentZap && (
            <ZapModal
               isOpen={currentZap}
               onClose={() => setCurrentZapIndex(-1)}
               currentZap={currentZap}
               zaps={zaps}
               onDone={doneCurrentZap}
            />
         )}
         {logs && (
            <div className="mt-3">
               {!showLogs && (
                  <Button
                     size="sm"
                     variant="outline-secondary"
                     onClick={() => setShowLogs(true)}
                  >
                     View logs
                  </Button>
               )}
               {showLogs && <pre>{logs}</pre>}
            </div>
         )}
      </div>
   )
}

export default ZapForm
