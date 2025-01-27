module.exports = {
    name: "kickall",
    description: "wyrzuca ka�dego z serwera",
    role: "admin",

    options: [
        {
            name: "message",
            description: "Wiadomo�� kicka",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        const numberOnline = GetNumPlayerIndices();
        if (numberOnline === 0) return interaction.reply({ content: "Nikt nie byl na serwerze aby wyrzucic.", ephemeral: false });
        getPlayers().forEach(async (player) => {
            DropPlayer(player, args.message);
        });
        return interaction.reply({ content: `Wszyscy ${numberOnline} gracze zostali wyrzuceni z serwera..`, ephemeral: false });
    },
};
