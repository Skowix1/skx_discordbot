module.exports = {
    name: "dajprzedmiot",
    description: "Dawanie przedmiotu graczowi",

    role: "god",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "STRING",
        },
        {
            name: "item",
            description: "Nazwa itemu",
            required: true,
            type: "STRING",
        },
        {
            name: "ilosc",
            description: "Ilość",
            required: true,
            type: "STRING",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe.", ephemeral: true });
        ExecuteCommand(`giveitem ${args.id} ${args.item} ${args.ilosc}`);
        return interaction.reply({ content: `Dodano \`${args.ilosc}x ${args.item}\` graczowi \`${GetPlayerName(args.id)}\``, ephemeral: false });
    },

};