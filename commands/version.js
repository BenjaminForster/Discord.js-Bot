module.exports = {
    name: "version",
    description: "Shows the current version the bot is running on.",
    execute(message, args){

        // Makes sure that this command can only be sent in the command channel to avoid spam on other channels.
        if(botconfig.commandchannel != message.channel.id) {
            return;
        }

        // Defines Discord and defines the version embed.
        const Discord = require('discord.js');
        const versionembed = new Discord.MessageEmbed()

        // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
        .setColor(botconfig.embedcolor)
        
        // Sets the title.
        .setTitle('Current Version:')

        // Sets the description.
        .setDescription(`Currently running version ${botconfig.version}.`)

        // Sets the footer.
        .setFooter('Open Source Bot, made and maintained by LoggyDogDog.')

        // Sends the version embed.
        message.channel.send(versionembed)
    }
}