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
        if (msg.member.voice.channel) {
            joinPlayLeave(msg.member.voice.channel, "./audio/hidden-famous.m4a");
        }
        
    },

}

async function joinPlayLeave (channel, audio) {

    const con = await channel.join();
    const dis = con.play(audio);

    dis.on('start', () => {
        console.debug(`${audio} is now playing`);
    });

    dis.on('finish', () => {
        console.debug(`${audio} has finished playing`);
        con.leave();
    });

    dis.on('error', console.error);

}