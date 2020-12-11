module.exports = {
    name: "famous",
    aliases: ['f', 'hf'],
    description: "Who's the famous cutie!",
    args: false,
    usage: "",
    guildOnly: false,
    execute(msg, args) {
        if (args.length > 0 && args[0] == 'true'){

            console.log(msg.channel.guild.members/*.cache.get('303031964292874240')*/);
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