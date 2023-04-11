const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "createEmbed",
  data: new SlashCommandBuilder()
    .setName("create-embed")
    .setDescription("Create an embed.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription('Add content and separate lines with ";".')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("title").setDescription("Add a title.").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    if (!interaction.options.getString("content")) {
      interaction.reply({
        content: "Please make sure that there is content in the embed.",
        ephemeral: true,
      });
    }

    const customEmbed = new EmbedBuilder().setColor(0xc026d3);

    if (interaction.options.getString("title")) {
      customEmbed.setTitle(interaction.options.getString("title"));
    }

    customEmbed.setDescription(
      interaction.options.getString("content").replace(";", "\n")
    );

    const channel = interaction.channel;

    channel.send({ embeds: [customEmbed] });

    interaction.reply({
      content: "The embed has been created.",
      ephemeral: true,
    });
  },
};
