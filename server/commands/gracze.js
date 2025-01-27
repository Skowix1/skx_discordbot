const { MessageButton } = require("discord.js");

module.exports = {
    name: "gracze",
    description: "Lista graczy na serwerze",
    role: "mod",

    run: async (client, interaction) => {
        if (GetNumPlayerIndices() === 0) return interaction.reply({ content: "Nie ma nikogo na serwerze.", ephemeral: false });
        const parts = [];
        let index = 0;
        getPlayers().sort().forEach((id) => {
            const i = Math.floor(index / 10);
            if (!parts[i]) parts[i] = "";
            parts[i] += `\`[${id}]\` **${GetPlayerName(id)}**`;
            index++;
        });
        const pages = [];
        parts.forEach((part) => {
            const embed = new client.Embed()
                .setTitle(`Graczy (${GetNumPlayerIndices()})`)
                .setDescription(`${part}`);
            pages.push(embed);
        });
        const backBtn = new MessageButton().setCustomId("previousbtn").setEmoji("🔺").setStyle("SECONDARY");
        const forwardBtn = new MessageButton().setCustomId("nextbtn").setEmoji("🔻").setStyle("SECONDARY");
        client.paginationEmbed(interaction, pages, [backBtn, forwardBtn]);
    },
};
