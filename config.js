/** ******************************
 * Generalne Ustawienia
 ********************************/

const LanguageLocaleCode = "pl";

// Publiczne
const FiveMServerName = "Skowix Developa";
const DiscordInviteLink = "https://discord.gg/rpdarkside";
const FiveMServerIP = "darksiderp.pl";

/** ********************
 * Discord bot ustawienia
 ***********************/

const EnableDiscordBot = true; 

// DISCORD BOT
const DiscordBotToken = "ZMIEN TUTAN NA SWOJ TOKEN BOTA";
const DiscordGuildId = "TUTAJ WEZ DAJ GUILD ID SERWERA DISCORD";
    
// WHITELISTA JAK CHCECIE
const EnableWhitelistChecking = false;
const DiscordWhitelistRoleIds = "000000000000000000, 000000000000000000"; // id roli jak cos

// discord permisje
const EnableDiscordSlashCommands = true;
const DiscordModRoleId = "ID ROLI";
const DiscordAdminRoleId = "ID ROLI";
const DiscordGodRoleId = "ID ROLI";

// Discord Bot Status
const EnableBotStatusMessages = true;
const BotStatusMessages = [
    "{playercount} na Skowix Developa",
];

/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! JEZELI NIE UMIESZ TO TEGO NIE RUSZAJ PROSTE I LOGICZNE DZIEKI !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


const DebugLogs = false; // nie dziala jak cos

// admin chat -- NIE DZIALA JAK COS
const EnableStaffChatForwarding = false;
const DiscordStaffChannelId = "000000000000000000";
const AdditionalStaffChatRoleIds = [
    // "000000000000000";
];

// ACE PERMISSIONS -- NIE DZIALA JAK COS
const EnableAutoAcePermissions = false;
const AutoAcePermissions = {
    // "example": "1200839950699077832",
    // "example2": [ "000000000000000000", "000000000000000000"],
};

// nie dziala jak cos
const EnableLoggingWebhooks = true;
const LoggingWebhookName = "dsa";
const LoggingAlertPingId = "&000000000000000000";
const LoggingWebhooks = {
    example: "",
};

module.exports = {
    EnableDiscordBot: getConBool("discord_enable_bot", EnableDiscordBot),
    EnableStaffChatForwarding: getConBool("discord_enable_staff_chat", EnableStaffChatForwarding),
    EnableLoggingWebhooks: getConBool("discord_enable_logging_webhooks", EnableLoggingWebhooks),
    DebugLogs: getConBool("discord_debug", DebugLogs),
    DiscordBotToken: GetConvar("discord_token", DiscordBotToken),
    DiscordGuildId: GetConvar("discord_guild_id", DiscordGuildId),
    LanguageLocaleCode: GetConvar("discord_lang", LanguageLocaleCode),
    FiveMServerName: GetConvar("discord_server_name", FiveMServerName),
    DiscordInviteLink: GetConvar("discord_invite", DiscordInviteLink),
    FiveMServerIP: GetConvar("discord_server_ip", FiveMServerIP),
    EnableWhitelistChecking: getConBool("discord_enable_whitelist", EnableWhitelistChecking),
    DiscordWhitelistRoleIds: getConList("discord_whitelist_roles", DiscordWhitelistRoleIds),
    EnableDiscordSlashCommands: getConBool("discord_enable_commands", EnableDiscordSlashCommands),
    DiscordModRoleId: GetConvar("discord_mod_role", DiscordModRoleId),
    DiscordAdminRoleId: GetConvar("discord_admin_role", DiscordAdminRoleId),
    DiscordGodRoleId: GetConvar("discord_god_role", DiscordGodRoleId),
    EnableBotStatusMessages: getConBool("discord_enable_status", EnableBotStatusMessages),
    BotStatusMessages: BotStatusMessages,
    EnableAutoAcePermissions: getConBool("discord_enable_ace_perms", EnableAutoAcePermissions),
    AutoAcePermissions: AutoAcePermissions,
    SaveScreenshotsToServer: getConBool("discord_save_screenshots", SaveScreenshotsToServer),
    DiscordStaffChannelId: GetConvar("discord_staff_channel_id", DiscordStaffChannelId),
    LoggingWebhooks: LoggingWebhooks,
    LoggingAlertPingId: GetConvar("discord_logging_ping_id", LoggingAlertPingId),
    LoggingWebhookName: GetConvar("discord_logging_name", LoggingWebhookName),
    StaffChatRoleIds: [
        GetConvar("discord_mod_role", DiscordModRoleId),
        GetConvar("discord_admin_role", DiscordAdminRoleId),
        GetConvar("discord_god_role", DiscordGodRoleId),
        ...AdditionalStaffChatRoleIds,
    ],
};

/** Returns convar or default value fixed to a true/false boolean
 * @param {boolean|string|number} con - Convar name
 * @param {boolean|string|number} def - Default fallback value
 * @returns {boolean} - parsed bool */
function getConBool(con, def) {
    if (typeof def == "boolean") def = def.toString();
    const ret = GetConvar(con, def);
    if (typeof ret == "boolean") return ret;
    if (typeof ret == "string") return ["true", "on", "yes", "y", "1"].includes(ret.toLocaleLowerCase().trim());
    if (typeof ret == "number") return ret > 0;
    return false;
}

/** returns array of items or default array provided
  @param {string} con - string of comma separated values
  @param {string|Array} def - string of comma separated values
  @returns {object} - array of discord ids */
function getConList(con, def) {
    const ret = GetConvar(con, def);
    if (typeof ret == "string") return ret.replace(/[^0-9,]/g, "").replace(/(,$)/g, "").split(",");
    if (Array.isArray(ret)) return ret;
    if (!ret) return [];
}
