module.exports = {
    name: "help",
    description: "Shows the help embed.",
    execute(message, args){

        // Makes sure that this command can only be sent in the command channel to avoid spam on other channels.
        if(botconfig.commandchannel != message.channel.id) {
            return;
        }

        // If the user has "2" as their second argument this will show the second page of the help embed.
        if(args[1] == "2") {
        
        // Defines Discord and defines the about embed.
        const Discord = require('discord.js');
        const helpembed2 = new Discord.MessageEmbed()

        // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
        .setColor(botconfig.embedcolor)

        // Sets the title.
        .setTitle("Help")

        // Sets the description.
        .setDescription("This embed shows all the commands")
        
        // Adds new fields.
        .addField(botconfig.prefix + "purge", "Purges the amount of messages specified (Staff only).")
        .addField(botconfig.prefix + "mute", "Mutes another user for the amount of time specified (Staff only).")
        .addField(botconfig.prefix + "softban", "Softbans another user (Staff only).")

        // Sets the footer.
        .setFooter("Page 2/2. Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the help page 2 embed.
        message.channel.send(helpembed2)

        // Else if there either isn't a second argument, or the second argument is "1" it will show the first help page.
        } else if(args[1] == "1" || !args[1]) {

        // Defines Discord and defines the about embed.
        const Discord = require('discord.js');
        const helpembed = new Discord.MessageEmbed()

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

        // Sets the footer.
        .setFooter("Page 1/2. Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the help embed.
        message.channel.send(helpembed)

        };
        
    }
}