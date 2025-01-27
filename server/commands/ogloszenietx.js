module.exports = {
    name: "ogloszenietx",
    description: "Wyślij ogłoszenie na serwer za pomoca TxAdmina.",

    role: "mod",

    options: [
        {
                name: "wiadomosc",
                description: "wiadomosc jaką wysłać na serwer",
                required: true,
                type: "STRING",
        }
    ],

    run: async (client, interaction, args) => {
        TriggerClientEvent('txcl:showAnnouncement', -1, args.wiadomosc, interaction.user.tag)
        return interaction.reply({ content: `Wysłano ogłoszenie o treści \`${args.wiadomosc}\`!` });
    },
};