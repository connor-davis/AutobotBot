const {ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js");

module.exports = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Will response with pong."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    execute: (interaction, client, logger) => {
        interaction.reply({content: "Pong!", ephemeral: true});
    }
}