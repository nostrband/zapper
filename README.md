# Zapper 

Zapper is a micro-app for zapping any Nostr event.

Benefits:
- Zapper can zap any event, not just ones that are supported by your nostr client.
- Zapper supports zap splits, unlike most apps out there.
- Zapper handles errors gracefully and allows you to retry the zap if anything fails.
- Zapper can be integrated by other apps - just redirect to it, or embed as an iframe.

If you want to integrate with Zapper, just redirect users to the /zap endpoint and add these query string parameters:
- id - required, bech32 id (npub, note, nevent, naddr)
- amount - optional, amount in sats
- comment - optional, comment text
- type - optional, type of payment ("zap" - default, "anon-zap" or "send-sats")
- auto_send - optional, if set to "true", will send the zap automatically

You can try it at https://zapper.nostrapps.org. 

