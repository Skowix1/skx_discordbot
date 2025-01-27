module.exports = {
    name: "nick",
    description: "Zmień pseudonim użytkownika na serwerze discord.",
    role: "mod",
    
    options: [
        {
            name: "użytkownik",
            description: "Użytkownik lub Discord ID.",
            required: true,
            type: "USER",
        },
        {
            name: "nowy_nick",
            description: "Nowy pseudonim.",
            required: true,
            type: "STRING",
        },
    ],
    
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser("użytkownik");
        const newNickname = interaction.options.getString("nowy_nick");
        const member = interaction.guild.members.cache.get(targetUser.id);
        
        if (!member) {
            return interaction.reply({ content: "Nie znaleziono użytkownika na serwerze.", ephemeral: true });
        }
        
        try {
            await member.setNickname(newNickname);
            return interaction.reply({ content: `Pseudonim użytkownika ${targetUser} został zmieniony na: \`${newNickname}\`.`, ephemeral: false });
        } catch (error) {
            return interaction.reply({ content: "Nie udało się zmienić pseudonimu. Upewnij się, że bot ma odpowiednie uprawnienia.", ephemeral: true });
        }
    },
};
