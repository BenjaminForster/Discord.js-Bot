module.exports = {
    name: "purge",
    description: "Will purge the amount of messages specified.",
    execute(message, args){

        // If person is not an administrator:
        if(!message.member.roles.cache.find(r => r.id === botconfig.administrator || botconfig.owner || botconfig.moderator )) {
            
            // Send this message
            message.reply("You do not have the rank to do that!")

            // Delete it's own message after 5 seconds.
                .then(d_message => { d_message.delete({ timeout: 5000 }); })
            
            // And stop
            return;
        }

        // This will make sure that there is actually a second argument. Without that, how would the bot know how many messages to delete?
        if(!args[1]) {
            message.reply("Please specify the amount of messages to delete.")
            return;
        }

        // This checks if the second argument is actually a number. The .bulkdelete() command we use in this script only works with a number,
        // which is pretty self explanitory. You can't delete fjewiosu number of messages, you need a number. "isNaN" stands for "Is Not A Number". 
        // This checks if the second argument is a number. If it is not, it will reply to the user and stop the command.
        if(isNaN(args[1])) {
            message.reply("Please specify a **number** of messages to delete.")
            return;
        }

        // Due to how the bulkDete command works, it can only delete 100 messages at a time. This command makes sure that the second argument is 100 or lower.
        if(args[1] > 100) {
            message.reply("You cannot delete more than 100 messages at a time!")
            return;
        }

        // This is the actual command. Fairly simple. All it does is that it deletes the amount of messages you specified in the second argument.
        message.channel.bulkDelete(args[1])
        message.channel.send(`Purged ${args[1]} messages.`).then(d_message => { d_message.delete({ timeout: 5000 }); })

        // START OF LOG FEATURE.
        
        // This part will send a message to a specific channel saying who muted who for how long and in what channel. It is basically a log command.
        // It can be commented out if you prefer to not have this. 
        const logchannel = message.client.channels.cache.get(botconfig.logchannel)
        
        // Makes sure that there is a channel with that ID. If there is not, it will log the error to the console.
        if(!logchannel) {
            console.log("No log channel with that ID!")
            return;
        }

        // Defines some stuff.
        const Discord = require('discord.js');
        const purgelog = new Discord.MessageEmbed()

        // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
        .setColor(botconfig.embedcolor)

        // Sets the title.
        .setTitle(`Purge log`)
        
        // Adds three new fields.
        .addField(`Staff member:`, `${message.author.tag}, ID: ${message.author.id}.`)
        .addField(`Amount purged:`, `${args[1]} message(s) purged.`)
        .addField(`Channel:`, `Command was executed in channel ${message.channel}.`)
        
        // Sets the footer.
        .setFooter("Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the log embed.
        logchannel.send(purgelog)

        // END OF LOG FEATURE.
        
        

    }
}