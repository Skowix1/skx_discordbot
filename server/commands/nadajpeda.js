module.exports = {
    name: "nadajpeda",
    description: "Nadanie peda graczowi",

    role: "mod",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "STRING",
        },
        {
            name: "ped",
            description: "Nazwa peda",
            required: true,
            type: "STRING",
    },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe.", ephemeral: true });
        ExecuteCommand(`setped ${args.id} ${args.ped}`);
        return interaction.reply({ content: `Nadano peda: \`${args.ped}\` dla gracza z ID: \`${args.id}\``, ephemeral: false });
    },
};