// Modules Setup
require('dotenv').config();

const D = require('discord.js');
const C = new D.Client();

// Connect to Discord Service
C.login(process.env.DISCORD_TOKEN);

// Setup variables

const listenChannls = ['784299081765486604'];

// Check if ready
C.on('ready', () => {
    console.log("ChaoticBot is authenticated and listening");
});

C.on('message', msg => {

    // Listen to just the Test Area
    if ( listenChannls.indexOf(msg.channel.id) > -1 ) {

        if ( msg.mentions.users.first() != null ) {

            if ( msg.mentions.users.first().id === C.user.id ) {
                console.log(`MSG: ${msg.content}`);
                input = setupCommand(msg.content);
                console.log(`INPUT: ${input}`);
                commandOptions(msg, input);
            }

        }

    }

});

function setupCommand ( msg ) {
    // Split into array.
    command_list = msg.trim().split(/ +/);
    // Remove the mention
    command_list.shift();
    return command_list
}

function commandOptions ( msg, input ) {
    const cmd = input.shift();

    switch ( cmd ) {
        case 'hello':
            msg.reply("Hello Friend!");
            break;
        case 'hf':
            msg.channel.send("HIDDEN FAMOUS!!");
            break;
        case 'cutie':

            break;
        case 'listen':
            if ( input.length !== 1 ) {
                msg.reply("Incorrect arguments given, please refer to '@ChaoticBot help listen' for more information.")
            } else {
                listenChannel(msg, input);
            }
            break;
        case 'help':
            // TODO
            help(msg, input);
            break;
        default:
            break;

    }
}

function help(msg, input) {

    if( input.length === 0 ) {
        // List all Menu items
    } else if ( input.length === 0 ) {

        arg = input.shift();
        switch ( arg ) {
            default:
                msg.channel.send(`${arg} command not found, please refer to '@ChaoticBot help' for avaiable commands.`)
        }

    } else {



    }

}

function listenChannel(msg, input) {

}