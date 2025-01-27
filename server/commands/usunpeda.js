module.exports = {
    name: "usunpeda",
    description: "Usunięcie peda graczowi",

    role: "mod",

    options: [
        {
                name: "id",
                description: "ID gracza",
                required: true,
                type: "STRING",
        }
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe.", ephemeral: true });
        ExecuteCommand(`delped ${args.id}`);
        return interaction.reply({ content: `Usunięto peda dla gracza z ID: \`${args.id}\``, ephemeral: false });
    },
};