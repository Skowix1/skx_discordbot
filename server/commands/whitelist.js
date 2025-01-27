module.exports = {
    name: "whitelist",
    description: "Zarządaj whitelistą",
    role: "god",

    options: [
        {
            type: "SUB_COMMAND",
            name: "zmien",
            description: "Wyłącz / włącz whiteliste",
            options: [
                {
                    name: "enabled",
                    description: "Wybierz włączenie lub wyłączenie whitelist",
                    required: true,
                    type: "BOOLEAN",
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "dodajrole",
            description: "Tymczasowo dodaj rolę do whitelisty (restart przywraca konfigurację)",
            options: [
                {
                    name: "rola",
                    description: "rola do whitelisty",
                    required: true,
                    type: "ROLE",
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "usunrole",
            description: "Tymczasowo usuń rolę z whitelisty (restart przywraca konfigurację)",
            options: [
                {
                    name: "rola",
                    description: "role do usuniecia z whitelisty",
                    required: true,
                    type: "ROLE",
                },
            ],
        },
    ],

    run: async (client, interaction, args) => {
        if (args.toggle) {
            const prev = client.config.EnableWhitelistChecking;
            client.config.EnableWhitelistChecking = args.enabled;
            return interaction.reply({ content: `Whitelista była wcześniej ${prev ? "enabled" : "disabled"} i jest teraz ${args.enabled ? "enabled" : "disabled"}`, ephemeral: true });
        } else if (args.addrole) {
            if (client.config.DiscordWhitelistRoleIds.includes(args.role)) {
                return interaction.reply({ content: "Ta rola jest już na whiteliście", ephemeral: true });
            }
            client.config.DiscordWhitelistRoleIds.push(args.role);
            return interaction.reply({ content: "Rola została dodana do whitelisty do restartu", ephemeral: true });
        } else if (args.removerole) {
            if (!client.config.DiscordWhitelistRoleIds.includes(args.role)) {
                return interaction.reply({ content: "Tej roli nie było na whiteliście", ephemeral: true });
            }
            client.config.DiscordWhitelistRoleIds = client.config.DiscordWhitelistRoleIds.filter(item => item !== args.role);
            return interaction.reply({ content: "Rola została usunięta z whitelisty", ephemeral: true });
        }

    },
};
