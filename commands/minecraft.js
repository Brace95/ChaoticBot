module.exports = {
    name: "minecraft",
    aliases: ['mc'],
    description: "Control the Minecraft Server",
    args: true,
    usage: "<aciton>",
    guildOnly: true,
    cooldown: 5,
    execute(DC, msg, args) {

        cmd = args.shift();

        switch(cmd) {
            case 'status':
                getStatus(msg);
                break;
            case 'start':
                startServer(msg);
                break;
            case 'stop':
                haltServer(msg);
                break;
            default:
                msg.reply(`No action '${cmd}' in this module, Please refer to the help guild of minecraft.`);
        }

    }
    
}

async function getStatus(msg){

    // Var
    serverStatus = "Down";
    serviceStatus = "Down";
    const axios = require('axios').default;
    const {Rcon} = require('rcon-client');

    // Get Server Status
    res = await axios.get(
        `https://api.vultr.com/v2/instances/${process.env.MC_SERVER_ID}`,
        {   
            headers: {
                Authorization: `Bearer ${process.env.VULTR_TOKEN}`
           }
        }
    );

    if (res.data.instance.status === "active")
        serverStatus = "Up";

    // Get Service Status
    const mc = new Rcon(
        {
            host: process.env.MC_SERVER_ADDRESS,
            port: process.env.MC_SERVER_PORT,
            password: process.env.MC_SERVER_PASS
        }
    );

    await mc.connect();

    if (mc.authenticated) serviceStatus = "Up";

    mc.end();


    // Send Message
    msg.channel.send(`Server Status: ${serverStatus}`);
    msg.channel.send(`Service Status: ${serviceStatus}`);

}

async function startServer(msg) {

    const axios = require('axios').default;

    res = await axios.post(
        `https://api.vultr.com/v2/instances/${process.env.MC_SERVER_ID}/start`,
        {   
            headers: {
                Authorization: `Bearer ${process.env.VULTR_TOKEN}`
           }
        }
    );

    msg.channel.send("Starting Server...");

}

async function haltServer(msg) {

    // Stop Service
    const {Rcon} = require('rcon-client');
    const mc = new Rcon(
        {
            host: process.env.MC_SERVER_ADDRESS,
            port: process.env.MC_SERVER_PORT,
            password: process.env.MC_SERVER_PASS
        }
    );

    await mc.connect();

    if (mc.authenticated)
        await mc.send('stop');

    mc.end();

    // Stop Server
    const axios = require('axios').default;

    res = await axios.post(
        `https://api.vultr.com/v2/instances/halt`,
        {   
            headers: {
                Authorization: `Bearer ${process.env.VULTR_TOKEN}`
           },
           data: {
               instance_ids: [
                process.env.MC_SERVER_ID
               ]
           }
        }
    );

    msg.channel.send("Stopping Server...");

}