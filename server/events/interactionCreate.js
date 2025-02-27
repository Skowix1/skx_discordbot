module.exports = {
    name: "interactionCreate",
    // interaction = https://discord.js.org/#/docs/main/stable/class/Interaction
    run: async (client, interaction) => {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({ content: "Wystąpił błąd...", ephemeral: false }).catch((error) => client.utils.log.handler("error", error));
            }
            if (!client.hasPermission(interaction.member, command.role)) {
                return interaction.reply({ content: "Nie masz permisji do używania tej komendy.", ephemeral: false }).catch();
            }

            const args = {};
            for (const option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args[option.name] = true;
                    option.options?.forEach((x) => {
                        args[x.name] = x.value;
                    });
                } else if (option.value) { args[option.name] = option.value; }
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);
            try {
                command.run(client, interaction, args);
            } catch (error) {
                client.utils.log.error(error);
                interaction.reply({ content: "Wystąpił błąd podczas wykonywania tej komendy!", ephemeral: true }).catch((err) => client.utils.log.handler("error", err));
            }
        }
        if (interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
    },
};
