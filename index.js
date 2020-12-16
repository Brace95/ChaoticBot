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
    console.debug(`BOTID: ${DC.user.id}`);
    console.log("ChaoticBot is authenticated and listening");
    console.log("------------------------");
});

DC.on('message', msg => {

    // Ignore invalid request
    if (msg.mentions.users.first() == null) return;
    if (msg.mentions.users.first().id != DC.user.id) return;
    if (!(msg.content.startsWith(`<@!${DC.user.id}>`))) return;

     // Debug message
     console.debug(`MSG: ${msg.content}`);

    // Split into array of items
    args = msg.content.trim().split(/ +/);

    // Remove the mention
    args.shift();

    // Debug message
    console.debug(`ARGS: ${args}`);

    // Check if command given
    if (args.length < 1) return;

    // Get command
    cmd = args.shift().toLowerCase();

    // Check if command exists
    const C = DC.commands.get(cmd) || DC.commands.find(cm => cm.aliases && cm.aliases.includes(cmd));
    console.debug(`COMMAND: ${C}`);
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
        C.execute(DC, msg, args);
    } catch (err) {
        console.error(err);
        msg.reply("An error occurred while trying to execute that command!")
    }

});

//const listenChannls = ['784299081765486604', '774212789803155456'];
