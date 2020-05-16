module.exports = {
    name: "mute",
    description: "Mutes a player for an amount of time.",
    execute(message, args){

        // Now, this is a new thing I decided to do as it helps with universal usage. Instead of defining the ranks that are 
        // allowed to use this command, you instead see if the user who runs the command has the permission to mute members.
        // With this, as long as your rank / role has the permission to do it, the bot will do it for you.
        if(!message.member.hasPermission("MUTE_MEMBERS")) {
            message.channel.send("You do not have the permissions to do that (Mute Members).")
            return;
        }
        
        // MS is used for the time function. You can install it by typing "npm install ms".
        const ms = require('ms');

        // This defines member as the first person that get's mentioned in the message.
        let member = message.guild.member(message.mentions.users.first());

        // If there is no member defined this will say that it could not find anyone by that name.
        if(!member) return message.channel.send("I couldn't find a user by that name.");

        // This defines the main role and the muted role (this works from a config file, so you need to replace
        // botconfig.memberrole and botconfig.mutedrole with the names of the roles.)
        let mainrole = message.guild.roles.cache.find(role => role.id === botconfig.memberrole);
        let muterole = message.guild.roles.cache.find(role => role.id === botconfig.mutedrole);

        // If either role is missing it will send a reply to the user trying to mute someone.
        if(!muterole) return message.reply("Couldn't find the mute role.")
        if(!mainrole) return message.reply("Couldn't find the default / member role.")

        // This makes it so that the second argument is the time.
        let time = args[2];

        // If you didn't specify a time in the second argument:
        if(!time) {

            // Reply with this message.
            message.reply("You need to specify a time in the second argument!");
            
            // Stop.
            return;
        }

        // Remove the main role and adds the muted role.
        member.roles.remove(mainrole.id);
        member.roles.add(muterole.id);

        // Sends a message mentioning the person who got muted and how long they are muted for.
        message.channel.send(`<@${member.user.id}> has now been muted for ${ms(ms(time))}`);

        
        
        // This part will send a message to a specific channel saying who muted who for how long and in what channel. It is basically a log command.
        // It can be commented out if you prefer to not have this. 
        const channel = message.client.channels.cache.get(botconfig.logchannel)
        
        // Makes sure that there is a channel with that ID. If there is not, it will log the error to the console.
        if(!channel) {
            console.log("No log channel with that ID!")
            return;
        }

        // Sends the log. It includes the message author's tag, their ID, how many messages they purged and in what channel.
        channel.send(`${message.author.tag} (ID: ${message.author.id}) muted ${member.user.tag} (ID ${member.user.id}) for ${ms(ms(time))} in channel ${message.channel}.`)
        
        

        // This is the time function. When the time is done:
        setTimeout(function() {

            // Add the main role back and remove the muted role.
            member.roles.add(mainrole.id);
            member.roles.remove(muterole.id);

            // Sends a message mentioning the person saying that they have been unmuted.
            message.channel.send(`<@${member.user.id}> has been unmuted.`)

            // This is part of the log system. You can comment this out if you prefer to not have logs.
            channel.send(`${member.user.tag} (ID ${member.user.id}) has been unmuted.`)

        }, ms(time));

    }
}