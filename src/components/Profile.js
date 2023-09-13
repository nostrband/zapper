import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { nip19 } from '@nostrband/nostr-tools';
import { Clipboard } from 'react-bootstrap-icons';
import { copy } from '../utils';

function Profile({ event }) {

  const formatNpub = (pubkey) => {
    const npub = nip19.npubEncode(pubkey);
    return npub.substring(0, 10) + "..." + npub.substring(npub.length - 4);
  };

  const formatName = (e) => {
    return e.meta?.profile?.display_name
      || e.meta?.profile?.name
      || formatNpub(e.pubkey)
      ;
  };

  return (
    <div className="d-flex flex-row align-items-center ">
      <Link to={`nostr:${nip19.npubEncode(event.pubkey)}`}>
        <Image rounded width="48" height="48" src={event.meta?.profile?.picture} />
      </Link>
      <div className="ms-2 d-flex flex-column">
        <div className="fw-bold">
          <Link to={`nostr:${nip19.npubEncode(event.pubkey)}`} className="text-black">
            {formatName(event)}
          </Link>
        </div>
        <small className="text-muted">
          {formatNpub(event.pubkey)}
          <Clipboard className="ms-1" size={14} style={{ cursor: "pointer" }}
            onClick={() => copy(nip19.npubEncode(event.pubkey))}
          />
        </small>
      </div>
    </div>
  )
}

export default Profile;
