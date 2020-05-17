module.exports = {
    name: "verify",
    description: "Allows the user to verify themselves.",
    execute(message, args){

        // In the server this bot was made for, there were two main roles: One role called member that let you see the channels, and one called User that allowed you to send messages.
        // This was very useful for the mute command, which basically just removes the User role that can send messages which in turn mutes them.
        const verify1 = message.guild.roles.cache.get(botconfig.verifyrole1);
        const verify2 = message.guild.roles.cache.get(botconfig.verifyrole2);

        // Defines "member" as the message author / sender.
        let member = message.guild.member(message.author);

        // If the message author does not have role 1, add it.
        if(!message.member.roles.cache.find(r => r.id === botconfig.verifyrole1)) {
            member.roles.add(verify1.id)
        };

        // If the message author does not have role 2, add it.
        if(!message.member.roles.cache.find(r => r.id === botconfig.verifyrole2)) {
            member.roles.add(verify2.id)
        };

        // Delete the message author's message.
        message.delete();

    }
}