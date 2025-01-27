module.exports = {
    name: "kill",
    description: "Zabij gracza",
    role: "admin",

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
        emitNet(`${GetCurrentResourceName()}:kill`, args.id);
        return interaction.reply({ content: `${GetPlayerName(args.id)} **(${args.id})** zostal zabity.`, ephemeral: false });
    },
};
