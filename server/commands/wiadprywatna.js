module.exports = {
    name: "wiadprywatna",
    description: "Wiadomosc prywatna do gracza",
    role: "mod",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "INTEGER",
        },
        {
            name: "wiadomosc",
            description: "Wiadomosc do gracza",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe", ephemeral: true });
        TriggerClientEvent('txcl:showDirectMessage', args.id, args.wiadomosc, interaction.user.tag)
        return interaction.reply({ content: `Wiadomosc wyslana do ${GetPlayerName(args.id)} (${args.id}).`, ephemeral: false });
    },
};
