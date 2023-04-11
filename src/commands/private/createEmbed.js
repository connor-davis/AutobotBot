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
    .addBooleanOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("Must the discords icon be used?")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("image")
        .setDescription("Must the discords banned be used?")
        .setRequired(false)
    )
    .addAttachmentOption((option) => option.setName())
    .addStringOption()
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

    if (interaction.options.getBoolean("thumbnail")) {
      customEmbed.setThumbnail("attachment://thumbnail.gif");
    }

    if (interaction.options.getBoolean("image")) {
      customEmbed.setImage("attachment://banner.gif");
    }

    customEmbed
      .setAuthor({
        name: "https://cycloneservices.co.za",
        iconURL: interaction.guild.iconURL(),
      })
      .setTimestamp()
      .setDescription(
        interaction.options.getString("content").replace(";", "\n")
      );

    const channel = interaction.channel;

    channel.send({
      embeds: [customEmbed],
      files: [
        path.join(process.cwd(), "assets", "banner.gif"),
        path.join(process.cwd(), "assets", "thumbnail.gif"),
      ],
    });

    interaction.reply({
      content: "The embed has been created.",
      ephemeral: true,
    });
  },
};
