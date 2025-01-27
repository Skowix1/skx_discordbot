module.exports = {
    name: "pogoda",
    description: "Ustawia pogodę na serwerze.",

    role: "god",

    options: [
        {
                name: "pogoda",
                description: "Typ pogody.",
                required: true,
                type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        ExecuteCommand(`weather ${args.pogoda}`);
        return interaction.reply({ content: `Pogoda \`${args.pogoda}\` Została zmieniona!`, ephemeral: false });
    },
};