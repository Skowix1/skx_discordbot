const fs = require("fs").promises;
const Buffer = require("buffer").Buffer;

module.exports = {
    name: "screenshot",
    description: "Screenshot ekranu gracza",
    role: "mod",

    options: [
        {
            name: "id",
            description: "ID gracza",
            required: true,
            type: "INTEGER",
        },
    ],

    run: async (client, interaction, args) => {
        if (!GetPlayerName(args.id)) return interaction.reply({ content: "ID gracza nieprawidlowe", ephemeral: true });
        if (GetResourceState("screenshot-basic") !== "started") return interaction.reply({ content: "Ta komenda potrzebuje skryptu `screenshot-basic` aby zadziałało!", ephemeral: false });
        await interaction.reply("Robienie zrzutu ekranu..");
        const name = `${client.utils.log.timestamp(true)}_${args.id}.jpg`;
        const data = await takeScreenshot(args.id).catch(error => {
            client.utils.log.error(error);
            return interaction.editReply("**ERROR 404 | SKOWIX**");
        });
        const buffer = new Buffer.from(data, "base64");
        const embed = new client.Embed()
            .setTitle(`Screenshoot ekranu gracza: ${GetPlayerName(args.id)}`)
            .setImage(`attachment://${name}`)
            .setFooter({ text: `Data ${client.utils.log.timestamp()}` });
        await interaction.editReply({ content: null, embeds: [ embed ], files: [ { attachment: buffer, name: name } ] }).catch(console.error);
        if (client.config.SaveScreenshotsToServer) {
            await fs.mkdir(`${client.root}/screenshots`, { recursive: true }).catch();
            await fs.writeFile(`${client.root}/screenshots/${name}`, data, { encoding: "base64", flag:"w+" }).catch(client.utils.log.error);
        }
        return
    },
};

const takeScreenshot = async (id) => {
    return new Promise((resolve, reject) => {
        global.exports["screenshot-basic"]["requestClientScreenshot"](id, {}, async (error, data) => {
            if (error) return reject(error);
            resolve(data.split(";base64,").pop());
        });
    });
};
