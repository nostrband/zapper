import { toast } from 'react-toastify'
import { nip19 } from '@nostrband/nostr-tools'

export async function copy(v) {
	try {
		await navigator.clipboard.writeText(v)
		toast.success('Copied!')
	} catch (err) {
		console.log('error', err)
		toast.error('Failed to copy!')
	}
}

export function formatAmount(a) {
	let s = a
	a = Math.floor(a / 1000)
	if (a >= 1) s = a + 'K'
	a = Math.floor(a / 1000)
	if (a >= 1) s = a + 'M'
	return s
}

export function formatSats(msats) {
	return (msats / 1000).toLocaleString(undefined, {
		minimumFractionDigits: 0,
	})
}

export const formatNpub = (pubkey) => {
	const npub = nip19.npubEncode(pubkey)
	return npub.substring(0, 10) + '...' + npub.substring(npub.length - 4)
}

export const encodeNpub = (pubkey) => {
	return nip19.npubEncode(pubkey)
}
