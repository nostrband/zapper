import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { ArrowClockwise, CaretDown, Check, Play, X } from 'react-bootstrap-icons';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { nip19 } from '@nostrband/nostr-tools';
import 'react-toastify/dist/ReactToastify.css';
import {
	nostr,
	TYPE_ZAP,
	TYPE_ANON_ZAP,
	TYPE_SEND_SATS,
} from "../nostr"
import Profile from './Profile';
import ZapModal from './ZapModal';
import { formatAmount, formatSats } from '../utils';

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

const AMOUNTS = [
	[21, "👍"],
	[210, "👏"],
	[420, "⭐"],
	[555, "🔥"],
	[840, "🏅"],
	[1000, "🤙"],
	[5000, "💜"],
	[10000, "😻"],
	[20000, "🤩"],
	[50000, "🚀"],
	[100000, "🤯"],
	[1000000, "🏆"],
];

const COMMENTS = [
	"👍 Amazing!",
	"🚀 LFG!",
	"⭐ Great job!",
	"👀 Looking good!",
	"🙏 Thank you!",
	"💜 Love it!",
	"👌 Way to go!",
	"😻 Yes please!",
	"🏆 Winner!",
	"💥 BOOM!",
	"🤣 LMAOF!",
	"🤯 OMFG!",
];

function ZapForm() {

	const [searchParams, setSearchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	// single target event or relay-info
	const [target, setTarget] = useState(null);

	// several zap-split targets
	const [targetPubkeyWeights, setTargetPubkeyWeights] = useState([]);
	const [relays, setRelays] = useState([]);
	const [metas, setMetas] = useState([]);
	const [zaps, setZaps] = useState([]);

	// params
	const [id, setId] = useState("");
	const [amount, setAmount] = useState(0);
	//  const [amountValues, setAmountValues] = useState([]);
	const [type, setType] = useState("zap");
	const [comment, setComment] = useState("");
	const [wasAutoSend, setWasAutoSend] = useState(false);
	const [closeOnSend, setCloseOnSend] = useState(false);

	// UI state
	const [logs, setLogs] = useState("");
	const [autoSendTimer, setAutoSendTimer] = useState(0);
	const [timerId, setTimerId] = useState(undefined);
	const [currentZapIndex, setCurrentZapIndex] = useState(-1);

	// controls
	const [showAmountPicker, setShowAmountPicker] = useState(false);
	const [showCommentPicker, setShowCommentPicker] = useState(false);
	const [showLogs, setShowLogs] = useState(false);
	const [showJson, setShowJson] = useState(false);

	const log = (s) => {
		setLogs(prev => prev + "\n" + s);
	};

	const updateZap = (zap) => {
		const copy = { ...zap };
		setZaps(prev => {
			prev.splice(zap.index, 1, copy);
			return [...prev];
		});
	};

	const emitSend = () => {
		setTimeout(() => document.getElementById("send").click(), 0);
	};

	const sendZap = async (zap) => {
		setCurrentZapIndex(zap.index);

		// sends if has webLN, or just fetches invoices etc
		// if need to send manually
		return await nostr.sendZap(zap, log, updateZap);
	};

	const restartZap = (zap) => {
		if (zap.status === 'done')
			return;

		sendZap(zap);
	};

	const sendNextZap = async () => {

		const zap = zaps.find(z => !z.status);
		if (!zap) {
			setCurrentZapIndex(-1);
			return;
		}

		await sendZap(zap);
		if (zap.status === 'done')
			toast.success(`Sent ${formatSats(zap.amount)} sats`);

		// auto-sending next one
		if ((zap.status === 'done' || zap.status === 'error')
			&& nostr.hasWebLN()) {
			emitSend();
		}
	};

	const currentZap = currentZapIndex >= 0
		? zaps[currentZapIndex]
		: null;

	const doneCurrentZap = () => {
		currentZap.status = 'done';
		updateZap(currentZap);
		sendNextZap(); // next one
	}

	const updateAutoSendTimer = (sec) => {
		setAutoSendTimer(sec);
		const to = setTimeout(() => {
			if (sec > 1) {
				updateAutoSendTimer(sec - 1);
			} else {
				setAutoSendTimer(0);
				emitSend();
			}
		}, 1000);

		setTimerId(to);
	};

	const cancel = () => {
		if (timerId)
			clearTimeout(timerId);
		setTimerId(undefined);
		setAutoSendTimer(0);
	};

	// read params from query string
	useEffect(() => {
		const id = searchParams.get("id");
		setId(id);

		const amount = Number(searchParams.get("amount") || 0);
		setAmount(amount);

		//    const newAmountValues = (searchParams.get("amount_values") || "")
		//      .split(',')
		//      .map(v => v !== "" ? Number(v) : undefined)
		//      .filter(v => v !== undefined);
		//    if (!arrayEquals(amountValues, newAmountValues))
		//      setAmountValues(newAmountValues);

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

	// load the target if id changes
	useEffect(() => {

		const load = async () => {
			if (!id) {
				if (!searchParams.get("id"))
					setError("Specify id");
				return;
			}

			let targets = [];
			let target = "";
			let relays = [];
			const { type: idType, data } = nip19.decode(id);
			switch (idType) {
				case 'npub':
					targets.push({
						pubkey: data,
						weight: 1.0
					});
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

			let ndk = await nostr.getNDK(relays);

			let targetEvent = null;
			if (target !== "") {
				if (target.toLowerCase().startsWith("wss://")) {
					setError("Nrelay not supported yet");
					return;
					// FIXME get relay info
				} else if (target.includes(":")) {
					targetEvent = await nostr.fetchEventByAddr(ndk, target);
					if (!targetEvent) {
						setError("Failed to fetch target event by addr " + target);
						return;
					}
				} else {
					targetEvent = await nostr.fetchEventById(ndk, target);
					if (!targetEvent) {
						setError("Failed to fetch target event by id " + target);
						return;
					}
				}
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
					ndk = await nostr.getNDK(relays);
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

			const metas = await nostr.fetchMetas(ndk, pubkeys);
			setMetas(metas);
			console.log("metas", metas);

			if (targetEvent)
				targetEvent.meta = metas.find(m => m.pubkey === targetEvent.pubkey);

			setTarget(targetEvent);
		};

		setIsLoading(true);
		setError("");

		load().catch(console.error).finally(() => {
			setIsLoading(false);
		});

	}, [id]);

	// recalculate the zap array if amount or targets change
	useEffect(() => {
		const update = async () => {
			const ndk = await nostr.getNDK([]);
			const totalWeight = targetPubkeyWeights.reduce((total, pw) => total += pw.weight, 0);
			const zaps = targetPubkeyWeights.map((pw, index) => {

				const weight = pw.weight / totalWeight;
				const msats = Math.floor(1000 * amount * weight);
				const zap = nostr.createZap(ndk, {
					amount,
					comment,
					relays,
					msats,
					pubkey: pw.pubkey,
					target,
				});

				const meta = metas.find(m => m.pubkey === pw.pubkey);

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
			});

			if (zaps.length > 0) {
				console.log("zaps", zaps);
				setZaps(zaps);
			}

			return zaps;
		};

		if (metas.length > 0 && targetPubkeyWeights.length > 0) {
			// recalc
			update()
				.then((zaps) => {
					if (amount > 0 && zaps.length > 0 && wasAutoSend) {
						// set the timer
						updateAutoSendTimer(3);
						setWasAutoSend(false);
					}
				})
				.catch(console.error)
		}

	}, [target, targetPubkeyWeights, metas, amount, type, comment]);

	// launch the auto-send 
	useEffect(() => {
		if (wasAutoSend) {
			// make sure we drop the auto-send param and don't let it be returned to
			const params = new URLSearchParams(searchParams.toString());
			params.delete("auto_send");
			setSearchParams(params, { replace: true });
		}
	}, [wasAutoSend]);

	if (error) {
		return (
			<div>
				<h4>Error</h4>
				<div>{error}</div>
				<Button onClick={() => window.location.reload()}>Retry</Button>
			</div>
		)
	}

	const isNewZap = !zaps.find(z => z.status);
	let status = "";
	if (!isNewZap) {
		let paid = zaps.reduce((total, zap) => {
			return total + (zap.status === 'done' ? zap.amount : 0);
		}, 0);
		const done = zaps.filter(z => z.status === 'done').length;
		//		const todo = zaps.filter(z => !z.status).length;
		const error = zaps.filter(z => z.status === 'error').length;
		const todo = done === zaps.length ? done : `${done}/${zaps.length}`;
		status = `Sent ${formatSats(paid)} sats to ${todo} recipients`;
		if (error)
			status += `, ${error} errors`;
	}

	return (
		<div>
			<ToastContainer />

			<div>
				<ul className="nav nav-pills mb-3">
					{tabs.map((tab) => {
						return (
							<li
								key={tab.value}
								className="nav-item"
							>
								<a
									className={`nav-link ${type === tab.value && 'active'
										}`}
									href="#"
									onClick={(e) => { e.preventDefault(); setType(tab.value) }}
								>
									{tab.title}
								</a>
							</li>
						);
					})}
				</ul>
				<p>
					{type === TYPE_ZAP
						? 'Zap will be published on Nostr under your name.'
						: type === TYPE_ANON_ZAP
							? 'Zap will be published on Nostr anonymously.'
							: "No event will be published on Nostr."}
				</p>

				<Form>
					<h4>Amount</h4>

					<Modal
						show={showAmountPicker}
						onHide={() => setShowAmountPicker(false)}
						aria-labelledby="contained-modal-title-vcenter"
						centered
					>
						<Modal.Header closeButton>
							<Modal.Title>Pick amount</Modal.Title>
						</Modal.Header>
						<Modal.Body>

							<Container className="p-0">
								<Row>
									{AMOUNTS.map(ve => (
										<Col key={ve} md="2" xs="4" className="mb-2">
											<Button
												variant={amount === ve[0] ? "primary" : "outline-secondary"}
												className="w-100"
												onClick={() => { setAmount(ve[0]); setShowAmountPicker(false); }}
											>
												<b>{formatAmount(ve[0])} </b>
												{ve[1]}
											</Button>
										</Col>
									))}
								</Row>
							</Container>

						</Modal.Body>
						<Modal.Footer className="d-flex flex-column">
							<Button variant="outline-secondary" size="lg" className="w-100" onClick={() => setShowAmountPicker(false)}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					<InputGroup className="mb-3">
						<Form.Control
							placeholder="Enter or pick amount"
							aria-label="Enter or pick amount"
							aria-describedby="pick-amount"
							type="number"
							value={amount || ""}
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
						<Button variant="outline-secondary" id="pick-amount" onClick={() => setShowAmountPicker(true)}>
							<CaretDown /> Pick
						</Button>
					</InputGroup>

					{type !== TYPE_SEND_SATS && (
						<>
							<h4>Comment</h4>

							<Modal
								show={showCommentPicker}
								onHide={() => setShowCommentPicker(false)}
								aria-labelledby="contained-modal-title-vcenter"
								centered
							>
								<Modal.Header closeButton>
									<Modal.Title>Pick comment</Modal.Title>
								</Modal.Header>
								<Modal.Body>

									<Container className="p-0">
										<Row>
											{COMMENTS.map(c => (
												<Col key={c} md="6" xs="12" className="mb-2">
													<Button
														variant={comment === c ? "primary" : "outline-secondary"}
														className="w-100"
														onClick={() => { setComment(c); setShowCommentPicker(false); }}
													>
														<b>{c}</b>
													</Button>
												</Col>
											))}
										</Row>
									</Container>

								</Modal.Body>
								<Modal.Footer className="d-flex flex-column">
									<Button variant="outline-secondary" size="lg" className="w-100" onClick={() => setShowCommentPicker(false)}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>

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
								<Button variant="outline-secondary" id="pick-comment" onClick={() => setShowCommentPicker(true)}>
									<CaretDown /> Pick
								</Button>
							</InputGroup>

						</>
					)}

				</Form>

				{target && target.id && (
					<div className="d-flex flex-column">
						<h4>Event</h4>
						<Profile event={target} />
						<div className='mt-2'>
							{target.kind === 1 ? target.content
								: target.kind === 30023 ? (nostr.getTagValue(target, 'title') || nostr.getTagValue(target, 'summary'))
									: `Kind: ${target.kind}. ` + nostr.getTagValue(target, 'alt')
							}
						</div>
						<div>
							<small className="text-muted">
								<span>{new Date(target.created_at * 1000).toLocaleString()}</span>
								<Link className="ms-1 text-secondary" onClick={() => setShowJson(true)}>view json</Link>
							</small>
						</div>

						<Modal
							show={showJson}
							aria-labelledby="contained-modal-title-vcenter"
							centered
						>
							<Modal.Header closeButton>
								<Modal.Title>Event json</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<pre style={{ overflowY: "scroll", height: "300px", border: "1px solid #ddd" }}>
									{JSON.stringify({
										id: target.id,
										pubkey: target.pubkey,
										kind: target.kind,
										created_at: target.created_at,
										tags: target.tags,
										content: target.content,
										sig: target.sig,
									}, null, 2)}
								</pre>
							</Modal.Body>
							<Modal.Footer className="d-flex flex-column">
								<Button variant="outline-secondary" size="lg" className="w-100" onClick={() => setShowJson(false)}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>

					</div>
				)}


				{zaps.length > 0 && (
					<div className="d-flex flex-column mt-3">
						<h4>{zaps.length > 1 ? "Recipients" : "Recipient"}</h4>
						<Container className="p-0">
							{zaps.map(z => {
								return (
									<Row key={z.pubkey} className="gx-2 mb-2 align-items-center">
										<Col xs="7">
											<Profile event={z} />
										</Col>
										{z.weight && (
											<Col xs="auto">
												{Math.round(z.weight * 100) + "%"}
											</Col>
										)}
										{z.amount > 0 && (
											<Col xs="auto" className="ps-3">
												{formatSats(z.amount)} sats
											</Col>
										)}
										<Col xs="auto">
											<div onClick={() => restartZap(z)}>
												{(() => {
													switch (z.status) {
														case '':
															return !isNewZap && (<Play />);
														case 'paying':
														case 'waiting':
															return (<ArrowClockwise />);
														case 'error': return (<X />);
														case 'done': return (<Check />);
													}
												})()
												}
											</div>
										</Col>
									</Row>
								)
							})}
						</Container>
					</div>
				)}

				{isNewZap && (
					<div className="mt-3">
						<h4>Confirm</h4>
						<Button
							variant="outline-primary"
							size="lg"
							onClick={sendNextZap}
							disabled={!amount || !zaps.length}
						>
							{type === TYPE_SEND_SATS ? "Send" : "Zap"} {amount && `${amount}`} sats
							{zaps.length > 1 && ` to ${zaps.length} recipients`}
						</Button>
					</div>

				)}

				{!isNewZap && (
					<div className="mt-3">
						<h4>{status}</h4>
					</div>
				)}

				<div className='d-none' id='send' onClick={sendNextZap}></div>

				<Modal
					show={autoSendTimer > 0}
					onHide={cancel}
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Auto zapping in {autoSendTimer} seconds...</Modal.Title>
					</Modal.Header>
					<Modal.Body>Click cancel to zap manually.</Modal.Body>
					<Modal.Footer className="d-flex flex-column">
						<Button variant="outline-primary" size="lg" className="w-100" onClick={cancel}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>

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
						{showLogs && (
							<pre>{logs}</pre>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ZapForm;
