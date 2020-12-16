module.exports = {
    name: "hello",
    aliases: ["hi"],
    description: "Hello World",
    args: false,
    usage: "",
    guildOnly: false,
    execute(DC, message, args) {
        message.reply("Hello Friend!!");
    },

}