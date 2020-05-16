module.exports = {
    name: "help",
    description: "Shows the help embed.",
    execute(message, args){

        // Makes sure that this command can only be sent in the command channel to avoid spam on other channels.
        if(botconfig.commandchannel != message.channel.id) {
            return;
        }

        // Defines Discord and defines the about embed.
        const Discord = require('discord.js');
        const aboutembed = new Discord.MessageEmbed()

        // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
        .setColor(botconfig.embedcolor)

        // Sets the title.
        .setTitle("Help")

        // Sets the description.
        .setDescription("This embed shows all the commands")
        
        // Adds new fields.
        .addField(botconfig.prefix + "help", "Shows the help embed.")
        .addField(botconfig.prefix + "about", "Shows the about embed.")
        .addField(botconfig.prefix + "version", "Shows the current version the bot is running.")
        .addField(botconfig.prefix + "purge", "Purges the amount of messages defined (Staff Only).")
        .addField(botconfig.prefix + "mute", "Allows you to mute a user (Requires setting up)")

        // Sets the footer.
        .setFooter("Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the about embed.
        message.channel.send(aboutembed)
    }
}