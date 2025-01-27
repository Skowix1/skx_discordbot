const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Wyświetl awatar użytkownika",
   // role: "mod",

    options: [
        {
            name: "użytkownik",
            description: "Oznaczenie użytkownika lub ID",
            required: true,
            type: "USER",
        },
    ],
    
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser("użytkownik");
        const avatarUrl = targetUser.displayAvatarURL({ dynamic: true, size: 1024 });
        const avatarEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`Awatar użytkownika ${targetUser.tag}`)
            .setImage(avatarUrl)
            .setFooter(`ID użytkownika: ${targetUser.id}`)
            .setTimestamp();
        return interaction.reply({ embeds: [avatarEmbed] });
    },
};
