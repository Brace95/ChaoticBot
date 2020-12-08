module.exports = {
    name: "famous",
    aliases: ['f', 'hf'],
    description: "Who's the famous cutie!",
    args: false,
    usage: "",
    guildOnly: false,
    execute(msg, args) {
        msg.channel.send("Hidden Famous!");
    },
}