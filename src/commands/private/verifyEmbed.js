const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "verifyEmbed",
    data: new SlashCommandBuilder()
        .setName("verify-embed")
        .setDescription("Create the verification embed.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: (interaction, client, logger) => {
        const guilds = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), { encoding: "utf-8" }));

        const verifyEmbed = new EmbedBuilder()
            .setColor(0xc026d3)
            .setTitle("Cyclone Services Verification")
            .setDescription(
                "Please click the verify button below to gain access to the rest of the discord server."
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("verifyButton")
                .setLabel("✔ Verify")
                .setStyle(ButtonStyle.Primary)
        );

        const channel = interaction.channel;

        channel.send({ embeds: [verifyEmbed], components: [row] });

        interaction.reply({ content: "The verify embed has been created.", ephemeral: true });
    }
};