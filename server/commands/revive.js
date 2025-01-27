module.exports = {
    name: "revive",
    description: "Odrodzenie gracza",
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
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe.", ephemeral: true });
        ExecuteCommand(`revive ${args.id}`);
        return interaction.reply({ content: `${GetPlayerName(args.id)} (${args.id}) Został odrodzony.`, ephemeral: false });
    },
};
