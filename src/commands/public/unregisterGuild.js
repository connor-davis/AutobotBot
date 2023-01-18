const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "unregisterGuild",
    data: new SlashCommandBuilder()
        .setName("unregister-guild")
        .setDescription("Unregister the server with autobot.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: (interaction, client, logger) => {
        const guilds = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), { encoding: "utf-8" }));
        const guild = guilds[interaction.guildId];

        interaction.guild.channels.delete(guild.verifyChannel);
        interaction.guild.channels.delete(guild.ticketsCategory);
        interaction.guild.roles.delete(guild.ownerRole);
        interaction.guild.roles.delete(guild.adminRole);
        interaction.guild.roles.delete(guild.botRole);
        interaction.guild.roles.delete(guild.memberRole);

        delete guilds[interaction.guildId];

        fs.writeFileSync(path.join(process.cwd(), "data", "guilds.json"), JSON.stringify(guilds), { encoding: "utf-8" });

        interaction.reply({ content: "This guild has been unregistered.", ephemeral: true });
    }
};