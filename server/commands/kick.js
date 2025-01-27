module.exports = {
    name: "kick",
    description: "wyrzuć gracza z serwera",
    role: "mod",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "INTEGER",
        },
        {
            name: "powod",
            description: "Powód wyrzucenia",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        const playerName = GetPlayerName(args.id);
        if (!playerName) {
            return interaction.reply({ content: "ID gracza nieprawidłowe.", ephemeral: true });
        }
        const reason = client.utils.replaceGlobals(client, args.powod || client.z.locale.kickedWithoutReason);
        DropPlayer(args.id, `Zostałeś wyrzucony z serwera. Powód: ${reason}. Administrator: ${interaction.user.tag}.`);
        return interaction.reply({ content: `${playerName} (${args.id}) został wyrzucony z serwera z powodem \`${args.powod}\`.`, ephemeral: false });
    },
};
