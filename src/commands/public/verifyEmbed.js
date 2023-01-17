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
        const ticketEmbed = new EmbedBuilder()
            .setColor(0x34d399)
            .setTitle("Autobot Macros Verification")
            .setDescription(
                "Please click the verify button below to gain access to the rest of the discord server."
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("verifyButton")
                .setLabel("✔ Verify")
                .setStyle(ButtonStyle.Secondary)
        );

        const channel = interaction.guild.channels.cache.get(process.env.VERIFY_CHANNEL_ID);

        channel.send({ embeds: [ticketEmbed], components: [row] });
    }
};