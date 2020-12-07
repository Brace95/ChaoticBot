module.exports = {
    name: "hello",
    aliases: ["hi"],
    description: "Hello World",
    args: false,
    usage: "",
    guildOnly: false,
    execute(message, args) {
        message.reply("Hello Friend!!");
    },

}