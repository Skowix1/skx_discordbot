fx_version "cerulean"
games { "gta5" }

author "Skowix"
description "Discord bot do fivema | Skowix"
repository "https://github.com/Skowix1/skx_discordbot"
lua54 'yes'

server_script "server/server.js"
client_script "client/client.lua"

dependencies {
    '/server:4890', -- Node16+
    'yarn',
}
