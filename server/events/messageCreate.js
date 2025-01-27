module.exports = {
    name: "messageCreate",
    // msg = https://discord.js.org/#/docs/main/stable/class/Message
    run: async (client, msg) => {
        if (!msg.content || msg.author.bot) return;
        if (client.config.EnableStaffChatForwarding && msg.channel.id == client.config.DiscordStaffChannelId) {
            client.utils.sendStaffChatMessage(client.skowix, msg.member.displayName, msg.content);
            return client.skowix.utils.log.write(`${msg.member.displayName}: ${msg.content}`, { tag: "Skowix Chat -- Nie dziala/ nie chce mi sie go robic xd" });
        }
    },
};
