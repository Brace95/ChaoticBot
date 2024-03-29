module.exports = {
    name: "famous",
    aliases: ['f', 'hf'],
    description: "Who's the famous cutie!",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 5,
    execute(DC, msg, args) {

        // Send the message
        msg.channel.send("Hidden Famous!");

        // Voice in hiddens voice channel
        G = DC.guilds.cache.get('391904110389231626');
        M = G.members.cache.get('303031964292874240');
        //M = G.members.cache.get('234304578663874560');

        if(M && M.voice.channel) {

            voices = [];

            // Get all voices 
            const FS = require('fs');
            FS.readdirSync('./audio/hf/').forEach(file => {
                console.log(file);
                voices.push(file);
            });

            // Grab a random voice
            play = voices[Math.floor(Math.random()*voices.length)];
            console.log(play);

            joinPlayLeave(M.voice.channel, `./audio/hf/${play}`);
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
        con.disconnect();
    });

    dis.on('error', console.error);

}