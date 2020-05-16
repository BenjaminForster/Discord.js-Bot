module.exports = {
    name: "purge",
    description: "Will purge the amount of messages specified.",
    execute(message, args){

        // Now, this is a new thing I decided to do as it helps with universal usage. Instead of defining the ranks that are 
        // allowed to use this command, you instead see if the user who runs the command has the permission to manage messages.
        // With this, as long as your rank / role has the permission to do it, the bot will do it for you.
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("You do not have the permissions to do that (Manage Messages).")
            return;
        }

        // This will make sure that there is actually a second argument. Without that, how would the bot know how many messages to delete?
        if(!args[1]) {
            message.reply("Please specify the amount of messages to delete in the second argument.")
            return;
        }

        // This checks if the second argument is actually a number. The .bulkdelete() command we use in this script only works with a number,
        // which is pretty self explanitory. You can't delete fjewiosu number of messages, you need a number. "isNaN" stands for "Is Not A Number". 
        // This checks if the second argument is a number. If it is not, it will reply to the user and stop the command.
        if(isNaN(args[1])) {
            message.reply("Please specify a **number** of messages to delete in the second argument.")
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

        
        
        // This part will send a message to a specific channel saying who deleted the amount of messages in what channel. It is basically a log command.
        // It can be commented out if you prefer to not have this. 
        const channel = message.client.channels.cache.get(botconfig.logchannel)
        
        // Makes sure that there is a channel with that ID. If there is not, it will log the error to the console.
        if(!channel) {
            console.log("No log channel with that ID!")
            return;
        }

        // Sends the log. It includes the message author's tag, their ID, how many messages they purged and in what channel.
        channel.send(`${message.author.tag} (ID: ${message.author.id}) purged ${args[1]} message(s) in channel ${message.channel}.`)
        
        

    }
}