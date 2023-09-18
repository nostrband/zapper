import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import { Clipboard } from 'react-bootstrap-icons'
import { copy, encodeNpub, formatNpub } from '../utils/helpers/general'
import { useOptimizedMediaSource } from '../hooks/useOptimizedMediaSource'

const formatName = (e) => {
   return (
      e.meta?.profile?.display_name ||
      e.meta?.profile?.name ||
      formatNpub(e.pubkey)
   )
}

function Profile({ event }) {
   const formattedName = formatName(event)
   const encodedNpub = encodeNpub(event.pubkey)
   const linkPath = `nostr:${encodeNpub(event.pubkey)}`

   const copyNpubHandler = () => copy(encodedNpub)

   const profileImage = useOptimizedMediaSource({
      pubkey: event.pubkey,
      originalImage: event.meta?.profile?.picture,
   })

   return (
      <div className="d-flex flex-row align-items-center ">
         <Link to={linkPath}>
            <Image
               rounded
               style={{ objectFit: 'cover' }}
               width="48"
               height="48"
               src={profileImage}
               alt={formattedName}
            />
         </Link>
         <div className="ms-2 d-flex flex-column">
            <div className="fw-bold">
               <Link to={linkPath} className="text-black">
                  {formattedName}
               </Link>
            </div>
            <small className="text-muted">
               {formatNpub(event.pubkey)}
               <Clipboard
                  className="ms-1"
                  size={14}
                  style={{ cursor: 'pointer' }}
                  onClick={copyNpubHandler}
               />
            </small>
         </div>
      </div>
   )
}

export default Profile
