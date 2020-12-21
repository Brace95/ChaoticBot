module.exports = {
    name: "cutie",
    aliases: ["c"],
    description: "All the Cuties.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 5,
    execute(DC, message, args) {
        message.channel.send("All Cuties!");
    },

}