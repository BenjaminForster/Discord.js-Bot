// Defines some stuff used by the script. It defines a new client, the config file and some other stuff.
const config = require('./config.json');
const Discord = require("discord.js");
const bot = new Discord.Client();

// This is a part of the command handler. It is used so that we can seperate commands into it's own files.
const fs = require("fs");
bot.commands = new Discord.Collection();

// This is also a part of the command handler. This is where most of the work is done. 
// It checks the directory specified for files ending with .js, which all of the commands do.
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

// Bot login which is taken from the config.json file.
bot.login(config.token);

// When the bot starts:
bot.on('ready', () => {
    
    // Sets the activity type and what it is.
    bot.user.setActivity(`Type ${config.prefix}help for more info.`, { type: "WATCHING"})

    // Sends a log to the console with the bot user tag and that it is online.
    console.log(`Logged in as ${bot.user.tag}.`)
})

// This defines botconfig as the same as config. It does that because config cannot be used globally, but botconfig can.
botconfig = config;


// This can be commented out if you prefer not to have a welcome message.
// When a new member joins the server:
bot.on('guildMemberAdd', member => {
    
    // Defines the welcome channel. The ID can be found in the config.json file.
    const channel = bot.channels.cache.get(config.welcome)
    
    // If the ID provided in the config.json file is not a valid one, then this will log an error in the console.
    if(!channel) {
        console.log("No welcome channel with that ID!")
        return;
    }

    // This is the welcome message. The config.servername is the name of the server defined in config.json
    channel.send(`Welcome to ${config.servername}, ${member}. Please go to the <#${config.verifychannel}> channel to get server access.`)

})

/*

// Chat filter can be commented out if you prefer not to have a filter.
// This is a chat filter. Here are the forbidden words.
var forbiddenwords = ["fuck", "bitch"]

// When a message gets sent:
bot.on('message', async message => {

    // Make the message lower case so that it is case insensitive.
    let messagecontent = message.content.toLowerCase();

    // Here starts the filter.
    for (x = 0; x < forbiddenwords.length; x++) {

        // If message includes the forbidden words:
        if(messagecontent.includes(forbiddenwords[x])){

            // Will DM the sender saying the message provided.
            await message.author.send("That word is not allowed here!")

            // Will delete the message and then stop.
            message.delete()
            return;
        }
    }
});

*/

// Here is where the commands start. These only direct towards the command.js files .
bot.on('message', message => {

    // This defines args. Args is basically the new arguments, which is after the first space.
    let args = message.content.substring(config.prefix.length).split(/ +/);

    // This says that if the command does not start with the prefix defined in config.json, don't execute it.
    if (!message.content.startsWith(config.prefix)) {
        return;
    }

    // Here is where we start the commands themselves. The (args[0]) part shows that the first thing after the prefix is the command.
    // All of these commands direct to the .js file corresponding to the command. These cases just define where the command is / what commands there are.
    switch (args[0].toLowerCase()) {

        // Case for the verify command.
        case "verify":
            bot.commands.get('verify').execute(message, args);
        break;

        // Case for the help command.
        case "help":
            bot.commands.get('help').execute(message, args);
        break;

        // Case for the about command.
        case "about":
            bot.commands.get('about').execute(message, args);
        break;

        // Case for the version command.
        case "version":
            bot.commands.get('version').execute(message, args);
        break;

        // Case for the purge command.
        case "purge":
            bot.commands.get('purge').execute(message, args);
        break;

        // Case for the mute command.
        case "mute":
            bot.commands.get('mute').execute(message, args);
        break;

        // Case for the soft ban command.
        case "softban":
            bot.commands.get('softban').execute(message, args);
        break;

        // Case for the kick command.
        case "kick":
            bot.commands.get('kick').execute(message, args);
        break;

        // Case for the ban command.
        case "ban":
            bot.commands.get('ban').execute(message, args);
        break;

    }
})