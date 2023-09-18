import React, { useState } from 'react'
import { Link } from 'react-bootstrap-icons'
import Profile from '../../Profile'
import { nostr } from '../../../modules/nostr'
import { EventModal } from '../../Modal/EventModal'
import { formatDate } from '../../../utils/helpers/general'

const getSubtitle = (target) => {
   if (target.kind === 1) {
      return target.content
   }
   if (target.kind === 30023) {
      return (
         nostr.getTagValue(target, 'title') ||
         nostr.getTagValue(target, 'summary')
      )
   }
   return `Kind: ${target.kind}. ${nostr.getTagValue(target, 'alt')}`
}

export const Event = ({ target }) => {
   const [showJson, setShowJson] = useState(false)

   const toggleShowJSON = () => setShowJson((prevState) => !prevState)

   return (
      <div className="d-flex flex-column">
         <h4>Event</h4>
         <Profile event={target} />
         <div
            className="mt-2"
            style={{
               textOverflow: 'ellipsis',
               overflowX: 'hidden',
            }}
         >
            {getSubtitle(target)}
         </div>
         <div>
            <small className="text-muted">
               <span>{formatDate(target.created_at)}</span>
               <Link className="ms-1 text-secondary" onClick={toggleShowJSON}>
                  {' '}
                  view json
               </Link>
            </small>
         </div>

         {/* Show event on json format */}
         <EventModal show={showJson} onHide={toggleShowJSON} />
      </div>
   )
}
