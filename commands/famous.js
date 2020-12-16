const { Guild } = require("discord.js");

module.exports = {
    name: "famous",
    aliases: ['f', 'hf'],
    description: "Who's the famous cutie!",
    args: false,
    usage: "",
    guildOnly: false,
    execute(DC, msg, args) {
        if (args.length > 0 && args[0] == 'true'){
            Guild = DC.guilds.cache.get('391904110389231626');
            //Member = Guild.members.cache.get('303031964292874240');
            Member = Guild.members.cache.get('234304578663874560');
            console.log(Member.voice.channel);
            //if (msg.member.voice.channel)
            //    joinPlayLeave(msg.member.voice.channel, "./audio/hidden-famous.mp3");
        }
        msg.channel.send("Hidden Famous!");
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
        con.disconnect();
    });

    dis.on('error', console.error);

}