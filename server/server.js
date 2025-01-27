const skowix = {};

const { readdirSync } = require("fs");
skowix.root = GetResourcePath(GetCurrentResourceName());
skowix.config = require(`${skowix.root}/config`);
skowix.locale = require(`${skowix.root}/locales/${skowix.config.LanguageLocaleCode}`);
skowix.utils = require(`${skowix.root}/server/utils`);
const Bot = require(`${skowix.root}/server/bot`);
skowix.bot = new Bot(skowix);



SetConvarReplicated("skowixdiscord_servername", skowix.config.FiveMServerName);
SetConvarReplicated("skowixdiscord_discordinvite", skowix.config.DiscordInviteLink);
SetConvarReplicated("skowixdiscord_serverip", skowix.config.FiveMServerIP);
SetConvarReplicated("skowixdiscord_userpresence", String(skowix.config.enableUserPresence));

on("playerConnecting", async (name, setKickReason, deferrals) => {
    const player = source;
    if (!skowix.config.EnableWhitelistChecking || !skowix.config.EnableDiscordBot) return;
    deferrals.defer();
    await skowix.utils.sleep(0);
    deferrals.update(skowix.utils.replaceGlobals(skowix, skowix.locale.checkingWhitelist.replace(/{name}/g, name)));
    await skowix.utils.sleep(0);
    const discordID = skowix.utils.getPlayerDiscordId(player);
    if (!discordID) return deferrals.done(skowix.utils.replaceGlobals(skowix, skowix.locale.discordNotOpen));
    const member = skowix.bot.getMember(discordID);
    if (!member) return deferrals.done(skowix.utils.replaceGlobals(skowix, skowix.locale.notInDiscordServer));
    const whitelisted = skowix.bot.isRolePresent(member, skowix.config.DiscordWhitelistRoleIds);
    if (whitelisted) deferrals.done();
    else deferrals.done(skowix.utils.replaceGlobals(skowix, skowix.locale.notWhitelisted));
});

// EXPORTS

global.exports("isRolePresent", (identifier, role) => {
    return skowix.bot.isRolePresent(identifier, role);
});

global.exports("getRoles", (identifier) => {
    return skowix.bot.getMemberRoles(identifier);
});

global.exports("getName", (identifier) => {
    const member = skowix.bot.parseMember(identifier);
    return member.displayName || false;
});

global.exports("getDiscordId", (identifier) => {
    return skowix.utils.getPlayerDiscordId(identifier);
});
