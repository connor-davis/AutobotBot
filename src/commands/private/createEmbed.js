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
    .addSubcommand((fieldsSubCommand) =>
      fieldsSubCommand
        .setName("field")
        .setDescription("Add a field to the embed.")
        .addStringOption((option) =>
          option.setName("fieldTitle").setDescription("Set the fields title")
        )
        .addStringOption((option) =>
          option
            .setName("fieldContent")
            .setDescription("Set the fields content.")
        )
    )
    .addStringOption((option) =>
      option.setName("title").setDescription("Add a title.").setRequired(false)
    )
    .se.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    // const customEmbed = new EmbedBuilder()
    //   .setColor(0xc026d3)
    //   .setTitle("Cyclone Services Verification")
    //   .setDescription(
    //     "Please click the verify button below to gain access to the rest of the discord server."
    //   );

    // const row = new ActionRowBuilder().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("verifyButton")
    //     .setLabel("✔ Verify")
    //     .setStyle(ButtonStyle.Primary)
    // );

    // const channel = interaction.channel;

    // channel.send({ embeds: [verifyEmbed], components: [row] });

    interaction.reply({
      content: "The verify embed has been created.",
      ephemeral: true,
    });
  },
};
