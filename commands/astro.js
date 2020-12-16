module.exports = {
    name: "astro",
    aliases: ["ac"],
    description: "Astro's a Cutie.",
    args: false,
    usage: "",
    guildOnly: false,
    execute(DC, message, args) {
        message.channel.send("Astro Cutie!");
    },

}