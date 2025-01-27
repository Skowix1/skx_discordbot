module.exports = {
    name: "identifikatory",
    description: "Zobacz wszystkie identyfikatory gracza.",
    role: "mod",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "INTEGER",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe", ephemeral: true });
        const embed = new client.Embed()
            .setColor(client.config.embedColor)
            .setTitle(`${GetPlayerName(args.id)}'s identifiers`)
            .setFooter({ text: "Szanuj prywatnosc i unikaj doxowania graczy oraz podawania komuś tego!" });
        let desc = "";
        for (const [key, value] of Object.entries(client.utils.getPlayerIdentifiers(args.id))) {
            if (key == "discord") desc += `**${key}:** <@${value}> (${value})\n`;
            else desc += `**${key}:** ${value}\n`;
        }
        embed.setDescription(desc);
        return interaction.reply({ embeds: [embed], ephemeral: true }).catch();
    },
};
