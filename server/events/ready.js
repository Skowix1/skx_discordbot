module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        if (client.config.EnableDiscordSlashCommands) {
            const guild = client.guilds.cache.get(client.config.DiscordGuildId);
            if (!guild) return client.utils.log.error("NIE ZNALEZIONO SERWERA DISCORD – Czy konfiguracja „DiscordGuildId” jest poprawna?");
            await guild.commands.set(client.arrayOfCommands).catch((error) => client.utils.log.handler("error", error));
        }
        if (client.config.EnableBotStatusMessages && client.config.BotStatusMessages) statusUpdater(client);
        client.utils.log.info(`Zalogowano poprawnie jako ${client.user.tag}.`);
        client.utils.log.info("^3[Skowix Bot] ^7 Jesteś zadowolony z bota? bądź chcesz coś w nim zmienić dodać a nie potrafisz? dodaj do znajomych na discordzie: skowix___");
        emit("skx_discordbot:ready");
    },
};

async function statusUpdater(client) {
    setInterval(function() {
        try {
            const msg = client.utils.replaceGlobals(client, client.config.BotStatusMessages[Math.floor(Math.random() * client.config.BotStatusMessages.length)]);
            client.user.setActivity({ name: msg, type: "PLAYING" });
        } catch (e) {
        }
    }, 20000);
}
