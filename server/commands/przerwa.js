module.exports = {
    name: "przerwa",
    description: "Nałóż przerwę na użytkownika na określony czas.",
    role: "mod",

    options: [
        {
            name: "użytkownik",
            description: "Użytkownik lub Discord ID.",
            required: true,
            type: "USER",
        },
        {
            name: "czas",
            description: "Czas przerwy w minutach.",
            required: true,
            type: "INTEGER",
        },
    ],

    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser("użytkownik");
        const timeInMinutes = interaction.options.getInteger("czas");
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.reply({ content: "Nie znaleziono użytkownika na serwerze.", ephemeral: true });
        }

        if (timeInMinutes <= 0) {
            return interaction.reply({ content: "Czas przerwy musi być większy niż 0.", ephemeral: true });
        }
        const timeInMilliseconds = timeInMinutes * 60 * 1000;

        try {
            await member.timeout(timeInMilliseconds, `Przerwa nałożona przez ${interaction.user.tag}`);
            return interaction.reply({ content: `Nałożono przerwę na użytkownika ${targetUser} na ${timeInMinutes} minut.`, ephemeral: false });
        } catch (error) {
            console.error("Błąd przy nakładaniu przerwy:", error);
            return interaction.reply({ content: "Nie udało się nałożyć przerwy. Upewnij się, że bot ma odpowiednie uprawnienia.", ephemeral: true });
        }
    },
};
