module.exports = {
    name: "listen",
    aliases: ["l"],
    description: "Set text channels for the bot to listen to.",
    args: true,
    usage: "<channel name>",
    guildOnly: true,
    execute(DC, message, args) {
        let ch = args.shift().toLowerCase();
        let channel = ch.match(/<#(\d+)>/)
        if (channel) {
            console.log(channel);
        }

    },

}