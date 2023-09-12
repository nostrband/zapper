import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { nip19, nip57 } from '@nostrband/nostr-tools';
import NDK, { NDKRelay, NDKNip07Signer, NDKEvent } from '@nostrband/ndk';

const TYPE_ZAP = 'zap';
const TYPE_ANON_ZAP = 'anon-zap';
const TYPE_SEND_SATS = 'send-sats';

const tabs = [
  {
    title: 'Zap',
    value: TYPE_ZAP,
  },
  {
    title: 'Anon zap',
    value: TYPE_ANON_ZAP,
  },
  {
    title: 'Send sats',
    value: TYPE_SEND_SATS,
  },
];

function getTags(e, name) {
  return e.tags.filter((t) => t.length > 0 && t[0] === name);
}

function getTag(e, name) {
  const tags = getTags(e, name);
  if (tags.length === 0) return null;
  return tags[0];
}

function getTagValue(e, name, index, def) {
  const tag = getTag(e, name);
  if (tag === null || !tag.length || (index && index >= tag.length))
    return def !== undefined ? def : '';
  return tag[1 + (index || 0)];
}

function enableWindowInterface(name, cb) {
  // check window[name] periodically, backoff exponentially,
  // and if we've detected it give it a bit more time
  // to init
  let period = 100;
  let has = false;
  async function check() {
    if (has) {
      cb();
    } else {
      if (name in window) {
        has = true;
        // wait until it initializes
        setTimeout(check, 200);
      } else {
        period *= 2;
        setTimeout(check, period);
      }
    }
  }

  // start
  check();
}

let ndkObject = null;
let hasNip07 = false;
let hasWebLN = false;

enableWindowInterface('nostr', () => {
  hasNip07 = true;
  if (ndkObject)
    ndkObject.signer = new NDKNip07Signer();
});

enableWindowInterface('webln', () => {
  hasWebLN = true;
  window.webln.enable();
});

async function getNDK(relays) {
  if (!ndkObject) {
    relays = [...new Set([...relays, "wss://relay.nostr.band"])]; 
    
    const nip07signer = hasNip07 ? new NDKNip07Signer() : null;
    ndkObject = new NDK({ signer: nip07signer });
  }
    
  const rs = [];
  for (const r of relays) {
    if (ndkObject.pool.relays.get(r))
      continue;
      
    const relay = new NDKRelay(r);
    ndkObject.pool.addRelay(relay);
    rs.push(relay.connect());
  }
    
  const to = new Promise((ok) => {
    setTimeout(ok, 1000);
  });
    
  // wait until all new relays connect, or a timeout is hit
  await Promise.race([to, Promise.allSettled(rs)]);

  return ndkObject;
}

async function fetchMetas(ndk, pubkeys) {
  const filter = {
    kinds: [0],
    authors: pubkeys,
  };
  let events = await ndk.fetchEvents(filter);
  events = [...events.values ()];
  events.forEach(e => {
    try {
      e.profile = JSON.parse(e.content);
    } catch {}
  });
  
  console.log("pubkeys", pubkeys, "events", events);

  return events;
}

async function fetchEventById(ndk, id) {
  const filter = {
    ids: [id]
  };
  const event = await ndk.fetchEvent(filter);
  console.log("id", id, "event", event);

  return event;
}

async function fetchEventByAddr(ndk, addr) {
  const v = addr.split(':');
  const filter = {
    kinds: [Number(v[0])],
    authors: [v[1]],
  };
  if (v[2] !== "")
    filter["#d"] = [v[2]];

  const events = await ndk.fetchEvents(filter);
  console.log("filter", filter, "events", events);
  for (const e of events.values()) {
    const d = getTagValue(e, 'd');
    if (e.kind === Number(v[0]) && e.pubkey === v[1] && d === v[2]) {
      console.log("addr", addr, "event", e);
      return e;
    }
  }

  return null;
}

async function fetchInvoice(zap) {
  const event = encodeURI(JSON.stringify(await zap.zap.toNostrEvent()));
  const url = `${zap.callback}?amount=${zap.amount}&nostr=${event}`;
  console.log("invoice url", zap, url);
	  
  const res = await fetch(url)
  const body = await res.json()
  return body.pr;
}

async function sendNextZap(zaps, log, updateZap) {
  
  const zap = zaps.find(z => !z.status);
  if (!zap)
    return null; // all done

  try {

    log(`Zapping ${zap.pubkey}...`);
    if (!zap.meta)
      throw new Error("Failed to load profile info for "+zap.pubkey);

    if (zap.type === TYPE_ZAP || zap.type === TYPE_ANON_ZAP) {
      
      // get the nostr-invoice url
      log("Fetching callback...");
      zap.callback = await nip57.getZapEndpoint(zap.meta);
      updateZap(zap);
      log(`Callback: ${zap.callback}`);

      if (zap.type === TYPE_ZAP) {
	// sign our zap request
	log("Signing...");
	await zap.zap.sign();
	updateZap(zap);
	log("Signed");
      } else {
	// FIXME use ephemeral keys,
      }

      // get invoice tied to our zap request
      log("Fetching invoice...");
      zap.invoice = await fetchInvoice(zap);
      updateZap(zap);
      log(`Invoice: ${zap.invoice}`);

      // try to pay w/ webln
      if (hasWebLN) {
	log("Paying...");
	const r = await window.webln.sendPayment(zap.invoice);
	zap.preimage = r.preimage;
	updateZap(zap);
	log(`Paid: ${r.preimage}`);
	console.log("zap result", r);
      } else {
	// show the invoice and wait until it's paid (how?)
	throw new Error("Only WebLN supported at this point");
      }

      // FIXME wait until the zap is published, but how?
      // there are no single-letter tags that can be queries :(
      
    } else {
      // FIXME fetch invoice with LNURL
      throw new Error("Send sats not implemented yet");
    }
    
    zap.status = 'done';
  } catch (e) {
    console.log("Zap send failed", e);
    zap.error = e;
    zap.status = 'error';
  }
  updateZap(zap);

  return zap;
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
         Array.isArray(b) &&
         a.length === b.length &&
         a.every((val, index) => val === b[index]);
}

function ZapForm() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // single target event or relay-info
  const [target, setTarget] = useState(null);

  // several zap-split targets
  const [targetPubkeyWeights, setTargetPubkeyWeights] = useState([]);
  const [targetMetas, setTargetMetas] = useState([]);
  const [relays, setRelays] = useState([]);
  const [metas, setMetas] = useState([]);
  const [zaps, setZaps] = useState([]);

  // params
  const [id, setId] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountValues, setAmountValues] = useState([]);
  const [type, setType] = useState("zap");
  const [comment, setComment] = useState("");
  const [wasAutoSend, setWasAutoSend] = useState(false);
  const [closeOnSend, setCloseOnSend] = useState(false);
  const [logs, setLogs] = useState("");
  const [autoSendTimer, setAutoSendTimer] = useState(0);
  const [timerId, setTimerId] = useState(undefined);

  const log = (s) => {
    setLogs(prev => prev + "\n" + s);
  };

  const updateZap = (zap) => {
    setZaps(prev => {
      prev.splice(zap.index, 1, {...zap});
      return [...prev];
    });
  };
  
  const emitSend = () => {
    setTimeout(() => document.getElementById("send").click(), 0);
  };

  const send = async () => {

    await sendNextZap(zaps, log, updateZap);

    // auto-sending next one
    if (hasWebLN)
      emitSend();
  };

  const updateAutoSendTimer = (sec) => {
    setAutoSendTimer(sec);
    const to = setTimeout(() => {
      if (sec > 1) {
	updateAutoSendTimer(sec - 1);
      } else {
	setAutoSendTimer(0);
	// emitSend();
	console.log("ZAAAPPPP!!");
      }
    }, 1000);

    setTimerId(to);
  };

  const cancel = () => {
    if (timerId)
      clearTimeout(timerId);
    setTimerId(undefined);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    setId(id);

    const amount = Number(searchParams.get("amount") || 0);
    setAmount(amount);
    
    const newAmountValues = (searchParams.get("amount_values") || "")
      .split(',')
      .map(v => v !== "" ? Number(v) : undefined)
      .filter(v => v !== undefined);
    if (!arrayEquals(amountValues, newAmountValues))
      setAmountValues(newAmountValues);
    
    const zapType = searchParams.get("type") || "zap";
    setType(zapType);
    
    const comment = searchParams.get("comment") || "";
    setComment(comment);
    
    const closeOnSend = searchParams.get("close_on_send") === "true";
    setCloseOnSend(closeOnSend);
    
    const autoSend = searchParams.get("auto_send") === "true";
    if (autoSend)
      setWasAutoSend(true);

  }, [searchParams]);

  useEffect(() => {
    if (wasAutoSend) {
      updateAutoSendTimer(3);

      // make sure we drop the auto-send param and don't let it be returned to
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auto_send");
      setSearchParams(params, { replace: true });
    }
  }, [wasAutoSend]);
  
  useEffect(() => {

    const load = async () => {
      setIsLoading(true);
      setError("");

      if (!id) {
	setError("Specify id");
	return;
      }

      let targets = [];
      let target = "";
      let relays = [];
      const { type: idType, data } = nip19.decode(id);
      switch (idType) {
	case 'npub':
	  setTargetPubkeyWeights([{
	    pubkey: data,
	    weight: 1.0
	  }]);
	  break;

	case 'nprofile':
	  targets.push({
	    pubkey: data.pubkey,
	    weight: 1.0
	  });
	  relays = data.relays || [];
	  break;

	case 'note':
	  target = data;
	  break;

	case 'nevent':
	  target = data.id;
	  relays = data.relays || [];
	  break;

	case 'naddr':
	  target = data.kind + ":" + data.pubkey + ":" + data.identifier;
	  relays = data.relays || [];
	  break;

	case 'nrelay':
	  target = data;
	  break;

	default:
	  setError("Bad id " + id);
	  return;
      }

      let ndk = await getNDK(relays);
      
      let targetEvent = null;
      if (target !== "") {
	if (target.toLowerCase().startsWith("wss://")) {
	  setError("Nrelay not supported yet");
	  return;
	  // FIXME get relay info
	} else if (target.includes(":")) {
	  targetEvent = await fetchEventByAddr(ndk, target);
	  if (!targetEvent) {
	    setError("Failed to fetch target event by addr " + target);
	    return;
	  }
	} else {
	  targetEvent = await fetchEventById(ndk, target);
	  if (!targetEvent) {
	    setError("Failed to fetch target event by id " + target);
	    return;
	  }
	}

	setTarget(targetEvent);
      }

      // check zap tags of the target event for zap-split logic
      if (targetEvent) {
	const tags = targetEvent.tags.filter(t => t.length >= 2 && t[0] === "zap");
	if (tags.length) {

	  // collect zap-split targets
	  tags.forEach(z => {

	    // collect relays
	    if (z.length >= 3)
	      relays.push(z[2]);

	    const pubkey = z[1];
	    const weight = z.length >= 4 ? Number(z[3]) : 0.0;
	    targets.push({ pubkey, weight });
	  });

	  // all weights are zero
	  if (!targets.find(t => t.weight > 0.0))
	    targets.forEach(z => z.weight = 1.0); // set equal weights

	  // make sure ndk connects to these relays too
	  ndk = await getNDK(relays);
	} else {
	  targets.push({
	    pubkey: targetEvent.pubkey,
	    weight: 1.0,
	  });
	}
      }

      // no targets? we're done
      if (targets.length === 0) {
	setError("No zap target found");
	return;
      }

      setTargetPubkeyWeights(targets);
      setRelays(relays);

      const pubkeys = targets.map(pw => pw.pubkey);
      if (targetEvent)
	pubkeys.push(targetEvent.pubkey);
      
      const metas = await fetchMetas(ndk, pubkeys);
      setMetas(metas);
      console.log("metas", metas);
	
      const totalWeight = targets.reduce((total, pw) => total += pw.weight, 0);
      const zaps = targets.map((pw, index)  => {
	
	const msats = Math.floor(1000 * amount * pw.weight / totalWeight);      
	const zap = new NDKEvent(ndk, {
	  kind: 9734,
	  content: comment,
	  created_at: Math.floor(Date.now() / 1000),
	  tags: [
	    ["relays", ...relays],
	    ["amount", msats.toString()],
	    ["p", pw.pubkey],
	  ],
	});

	if (target) {
	  if (target.kind === 0 || target.kind === 3 
	      || (target.kind >= 10000 && target.kind < 20000)
	      || (target.kind >= 30000 && target.kind < 40000)) 
	    zap.tags.push(["a", target.kind + ":" + target.pubkey + ":" + getTagValue(target, 'd')]);
	  else
	    zap.tags.push(["e", target]);
	}

	const meta = metas.find(m => m.pubkey === pw.pubkey);
	
	return {
	  index,
	  zap,
	  meta,
	  type,
	  pubkey: pw.pubkey,
	  amount: msats,
	}
      });

      console.log("zaps", zaps);      

      setZaps(zaps);
    };

    load ().catch(console.error);

  }, [id, amount, amountValues, type, comment]);
  
  if (error)
    return (<h4>Error: {error}</h4>);
  
  // <h4 className="mt-5">Zap</h4>
  return (
    <div>
      <div>
	<Form>
	  <ul className="nav nav-pills mt-3 mb-3">
	    {tabs.map((tab) => {
	      return (
		<li
		  key={tab.value}
		  className="nav-item"
		>
		  <a
		    className={`nav-link ${
                    type === tab.value ? 'active' : ''
                  }`}
		    href="#"
		    onClick={(e) => { e.preventDefault(); setType(tab.value)} }
		  >
		    {tab.title}
		  </a>
		</li>
	      );
	    })}
          </ul>
          <p>
            {type === TYPE_ZAP
            ? 'Zap event will be published on Nostr on your behalf.'
	    : type === TYPE_ANON_ZAP
            ? 'Zap event will be published on Nostr anonymously.'
            : "No event will be published on Nostr."}
          </p>

	  {target && target.id && (
	    <div>Event: {target.id}</div>
	  )}

	  {targetPubkeyWeights.map(tw => (
	    <div key={tw.pubkey}>Target: {tw.pubkey}:{tw.weight}</div>
	  ))}

	  <div>Amount: {amount}</div>

	  {amountValues.length > 0 && amountValues.map(av => (
	    <div key={av}>AmountValue: {av}</div>
	  ))}

	  {zaps.map(z => (
	    <div key={z.index}>Split: {z.pubkey} : {z.amount} {z.status}</div>
	  ))}

	  <div>Comment: {comment}</div>

	  <div>
	    <button id="send" onClick={(e) => { e.preventDefault(); send() }}>send</button>
	  </div>
	  {autoSendTimer && (
	    <div>
	      <div>Auto-zapping in {autoSendTimer} sec...</div>
	      <button onClick={(e) => { e.preventDefault(); cancel() }}>cancel</button>
	    </div>
	  )}
	  
	  <div>Logs:
	    <pre>{logs}</pre>
	  </div>
	</Form>
      </div>
    </div>
  );
}

export default ZapForm;
