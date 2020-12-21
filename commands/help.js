module.exports = {
    name: "help",
    aliases: ['commands', 'h'],
    description: "List all of my commands or info about a specific command.",
    args: false,
    usage: "[command name]",
    guildOnly: false,
    cooldown: 0,
    execute (DC, msg, args) {

        const data = [];
        const { commands } = msg.client;

        if (!args.length) {
            data.push("Here's a list all my commands:\n");
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send '@ChaoticBot help [command name]' to get info on a specific commands!`);

            return msg.author.send(data, {split: true})
                .then(() => {
                    if (msg.channel.type === 'dm') return;
                    msg.reply("I've sent you a DM with all my commands!");
                })
                .catch(err => {
                    console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
                    msg.reply("It seems like I can't DM you! Do you have DMs disabled");
                })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!commands) return msg.reply("That's not a valid command!");

        data.push(`**Name:** ${command.name}`);
        if (command.aliases.length > 0) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        data.push(`**Description:** ${command.description}`);
        data.push(`**Usage:** @ChaoticBot ${command.name} ${command.usage}`);

        msg.channel.send(data, {split: true});

    }
}