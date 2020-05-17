module.exports = {
    name: "about",
    description: "Shows the about embed.",
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
        .setTitle(`${botconfig.servername} bot`)

        // Sets the description.
        .setDescription("This bot was created for the offical Open Source Discord server.")
        
        // Adds two new fields.
        .addField("Author", "LoggyDogDog is the creator and maintainer of the Open Source Bot.")
        .addField("Bugs / Suggestions", "If you have encountered any bugs or have any suggestions on what to add, feel free to DM LoggyDogDog about it.")

        // Sets the footer.
        .setFooter("Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the about embed.
        message.channel.send(aboutembed)

    }
}