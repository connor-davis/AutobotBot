const { PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "verifyEmbed",
    name: "ticket",
    data: new SlashCommandBuilder()
        .setName("verify-embed")
        .setDescription("Create the verification embed.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: (interaction, client, logger) => {
        interaction.reply("Hello, admin.");
    }
};