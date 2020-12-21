module.exports = {
    name: "astro",
    aliases: ["ac"],
    description: "Astro's a Cutie.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 5,
    execute(DC, message, args) {
        message.channel.send("Astro Cutie!");
    },

}