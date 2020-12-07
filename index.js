// Load Environment Variables
require('dotenv').config();

// Load Modules
const FS = require('fs')
const D = require('discord.js');
const DC = new D.Client();

// Setup Discord Connection
DC.login(process.env.DISCORD_TOKEN);
DC.commands = new D.Collection();

// Load Commands
const CF = FS.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const F of CF) {
    const T = require(`./commands/${F}`);
    DC.commands.set(T.name, T);
}

// Check if ready
DC.on('ready', () => {
    console.log("ChaoticBot is authenticated and listening");
});

DC.on('message', msg => {

    if ( msg.mentions.users.first() != null ) {

        if ( msg.mentions.users.first().id === DC.user.id ) {
            // Debug Message
            console.log(`MSG: ${msg.content}`);

            // Split into array of items
            args = msg.content.trim().split(/ +/);

            // Remove the mention
            args.shift();

            // Get command
            cmd = args.shift().toLowerCase();

            // Check if commands exists
            const C = DC.commands.get(cmd) || DC.commands.find(cm => cm.aliases && cm.aliases.includes(cmd));
            if (!C) return;

            // Check if args are needed and supplied
            if (C.args && !args.length) {
                let reply = `You didn't provide any arguments, ${msg.author}!`;
                if(C.usage)
                    reply += `\nThe proper usage would be: '@ChaoticBot ${C.name} ${C.usage}'`;
                
                return msg.channel.send(reply);
            }

            // Check if command is a guildOnly
            if (C.guildOnly && msg.channel.typr === 'dm') {
                return msg.reply("I can't execute that command inside DMs!");
            }

            try{
               C.execute(msg, args);
            } catch (err) {
                console.error(err);
                msg.reply("An error occurred while trying to execute that command!")
            }

        }

    }

});

//const listenChannls = ['784299081765486604', '774212789803155456'];
