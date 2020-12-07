module.exports = {
    name: "cutie",
    aliases: ["c"],
    description: "All the Cuties.",
    args: false,
    usage: "",
    guildOnly: false,
    execute(message, args) {
        message.channel.send("All Cuties!");
    },

}