module.exports = {
    name: "softban",
    description: "Bans a user and then immediately unbans them, which removes all their messages.",
    execute(message, args){

        // If person is not an administrator:
        if(!message.member.roles.cache.find(r => r.id === botconfig.administrator || botconfig.owner)) {
            
            // Send this message
            message.reply("You do not have the rank to do that!")

            // Delete it's own message after 5 seconds.
                .then(d_message => { d_message.delete({ timeout: 5000 }); })
            
            // And stop
            return;
        }

        // If there are no users mentioned in the second argument:
        if(!args[1]) {

            // Send this message.
            message.reply("Please define the person to softban.")

            // Stop
            return;

        }

        // This defines member as the first person that gets mentioned in the message.
        let softbanned = message.guild.member(message.mentions.users.first());

        // If there is no member defined this will say that it could not find anyone by that name.
        if(!softbanned) return message.channel.send("I couldn't find a user by that name.");

        // Send a message saying that the user has been softbanned.
        message.channel.send(`User ${softbanned.user.tag} has been softbanned.`)

        // Bans the person,
        softbanned.ban({ days: 1, reason: "Softbanned" })

        // and then unbans them.
        message.guild.members.unban(softbanned.user.id);

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
        const softbanlog = new Discord.MessageEmbed()

        // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
        .setColor(botconfig.embedcolor)

        // Sets the title.
        .setTitle(`Softban log`)
        
        // Adds three new fields.
        .addField(`Staff member:`, `${message.author.tag}, ID: ${message.author.id}.`)
        .addField(`Softbanned:`, `${softbanned.user.tag}, ID: ${softbanned.user.id},`)
        .addField(`Channel:`, `Command was executed in channel ${message.channel}.`)
        
        // Sets the footer.
        .setFooter("Open Source Bot, made and maintained by LoggyDogDog.")

        // Sends the log embed.
        logchannel.send(softbanlog)

        // END OF LOG FEATURE.

    }
}