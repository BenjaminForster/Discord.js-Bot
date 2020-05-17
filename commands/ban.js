module.exports = {
    name: "ban",
    description: "Bans another user.",
    execute(message, args){

    // If person is not an administrator or owner:
    if(!message.member.roles.cache.find(r => r.id === botconfig.administrator || botconfig.owner)) {
            
        // Send this message
        message.reply("You do not have the rank to do that!")

        // Delete it's own message after 5 seconds.
            .then(d_message => { d_message.delete({ timeout: 5000 }); })
        
        // And stop
        return;
    }
        
    // If there are no users specified:
    if(!args[1]) {
        message.reply("Please specify who to ban.")
        return;
    }

    // If there is no reason specified:
    if(!args[2]) {
        message.reply("Please specify a reason.")
        return;
    }

    // This defines member as the first person that gets mentioned in the message.
    let banned = message.guild.member(message.mentions.users.first());

    // If there is no member defined this will say that it could not find anyone by that name.
    if(!banned) return message.channel.send("I couldn't find a user by that name.");

    // Bans the user.
    banned.ban()

    // Sends a message saying that the user has been banned,
    message.channel.send(`User ${banned.user.tag} was banned for the reason: ${args[2]}.`)

        // and then deletes it after 5 seconds.
        .then(d_message => { d_message.delete({ timeout: 5000 }); })

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
    const banlog = new Discord.MessageEmbed()

    // This part edits the embed. It is pretty self-explanitory. The color is in the config.json file and can be edited.
    .setColor(botconfig.embedcolor)

    // Sets the title.
    .setTitle(`Ban log`)
        
    // Adds three new fields.
    .addField(`Staff member:`, `${message.author.tag}, ID: ${message.author.id}.`)
    .addField(`Banned:`, `${banned.user.tag}, ID: ${banned.user.id},`)
    .addField(`Reason:`, `Reason for the kick: ${args[2]}.`)
    .addField(`Channel:`, `Command was executed in channel ${message.channel}.`)
        
    // Sets the footer.
    .setFooter("Open Source Bot, made and maintained by LoggyDogDog.")

    // Sends the log embed.
    logchannel.send(banlog)

    // END OF LOG FEATURE.

    }
    
}