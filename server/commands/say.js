module.exports = {
    name: "say",
    description: "Bot powtarza wiadomość, którą podasz.",
    role: "mod",

    options: [
        {
            name: "wiadomosc",
            description: "Wiadomość, którą bot ma powtórzyć.",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        const wiadomosc = args.wiadomosc;

        if (!wiadomosc) {
            return interaction.reply({ content: "Proszę podać wiadomość do powtórzenia.", ephemeral: true });
        }

        return interaction.reply({ content: wiadomosc, ephemeral: false });
    },
};
