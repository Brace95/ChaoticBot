const famous = require("./famous");


module.exports = {
    name: "follow",
    aliases: ['hfs'],
    description: "Who's the famous cutie!",
    args: false,
    usage: "",
    guildOnly: false,
    execute(msg, args) {
        console.log("Testing");
        if (message.member.voice.channel) {
            const con = await message.member.voice.channel.join();
            const dis = con.play('./audio/hidden-famous.m4a');

            dis.on('start', () => {
                console.debug("hidden-famous.m4a is now playing");
            });

            dis.on('finish', () => {
                console.debug("hidden-famous.m4a has finished playing");
                con.leave();
            });

            dis.on('error', console.error);

        }
    },

}