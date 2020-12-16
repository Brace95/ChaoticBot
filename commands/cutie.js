module.exports = {
    name: "cutie",
    aliases: ["c"],
    description: "All the Cuties.",
    args: false,
    usage: "",
    guildOnly: false,
    execute(DC, message, args) {
        message.channel.send("All Cuties!");
    },

}