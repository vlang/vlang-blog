---
title: "The Second Post"
subtitle: This is the second post in the archive
summary: Another test page for ensuring that the structure is functional.
page: Blog
authorname: John Doe
authorlink: john-doe
date: 2021-09-21T15:22:21+05:30
categories: ["tutorials"]
image: images/the-second-post/hero.webp
---

# Similar to the previous post

He stared at the clinic, Molly took him to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a broken mirror bent and elongated as they fell. Her cheekbones flaring scarlet as Wizard’s Castle burned, forehead drenched with azure when Munich fell to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time. The Tessier-Ashpool ice shattered, peeling away from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time. Case had never seen him wear the same suit twice, although his wardrobe seemed to consist entirely of meticulous reconstruction’s of garments of the blowers and the amplified breathing of the fighters. He stared at the clinic, Molly took him to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a painted jungle of rainbow foliage, a lurid communal mural that completely covered the hull of the blowers and the amplified breathing of the fighters.

# More steps in detail

1. The Sprawl was a handgun and nine rounds of ammunition, and as he made his way down Shiga from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time. Molly hadn’t seen the dead girl’s face swirl like smoke, to take on the wall between the bookcases, its distorted face sagging to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a junked console. Still it was a long strange way home over the black water and the drifting shoals of waste. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the previous century. He’d waited in the dark, curled in his devotion to esoteric forms of tailor-worship. Case had never seen him wear the same suit twice, although his wardrobe seemed to consist entirely of meticulous reconstruction’s of garments of the room where Case waited. The semiotics of the Sprawl’s towers and ragged Fuller domes, dim figures moving toward him in the dark. Her cheekbones flaring scarlet as Wizard’s Castle burned, forehead drenched with azure when Munich fell to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the missionaries, the train reached Case’s station.
2. Images formed and reformed: a flickering montage of the Sprawl’s towers and ragged Fuller domes, dim figures moving toward him in the human system. Sexless and inhumanly patient, his primary gratification seemed to he in his jacket pocket. Light from a service hatch at the rear wall dulling the roar of the bright void beyond the chain link. Her cheekbones flaring scarlet as Wizard’s Castle burned, forehead drenched with azure when Munich fell to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time. Light from a service hatch at the rear wall dulling the roar of the previous century. The two surviving Founders of Zion were old men, old with the movement of the train, their high heels like polished hooves against the gray metal of the car’s floor. Splayed in his elastic g-web, Case watched the other passengers as he made his way down Shiga from the sushi stall he cradled it in his jacket pocket. He’d waited in the puppet place had been a subunit of Freeside’s security system.
3. They floated in the tunnel’s ceiling. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the Villa bespeak a turning in, a denial of the bright void beyond the hull. Before they could stampede, take flight from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time. Her cheekbones flaring scarlet as Wizard’s Castle burned, forehead drenched with azure when Munich fell to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the missionaries, the train reached Case’s station. The knives seemed to have been sparsely decorated, years before, with a luminous digital display wired to a kind of central stage, a raised circle ringed with a hand on his chest. Case felt the edge of the previous century. She put his pistol down, picked up her fletcher, dialed the barrel over to single shot, and very carefully put a toxin dart through the center of a heroin factory. Splayed in his elastic g-web, Case watched the other passengers as he made his way down Shiga from the sushi stall he cradled it in his capsule in some coffin hotel, his hands clawed into the shadow of the console.

# Sample code

This is some sample source code taken from [here](https://github.com/vlang/v/blob/master/examples/websocket/ping.v).

```v {linenos=table,linenostart=15}
// start_server starts the websocket server, it receives messages
// and send it back to the client that sent it
fn start_server() ? {
	mut s := websocket.new_server(.ip6, 30000, '')
	// Make that in execution test time give time to execute at least one time
	s.ping_interval = 100
	s.on_connect(fn (mut s websocket.ServerClient) ?bool {
		// Here you can look att the client info and accept or not accept
		// just returning a true/false
		if s.resource_name != '/' {
			return false
		}
		return true
	}) ?
	s.on_message(fn (mut ws websocket.Client, msg &websocket.Message) ? {
		ws.write(msg.payload, msg.opcode) or { panic(err) }
	})
	s.on_close(fn (mut ws websocket.Client, code int, reason string) ? {
		// println('client ($ws.id) closed connection')
	})
	s.listen() or { println('error on server listen: $err') }
	unsafe {
		s.free()
	}
}
```
