const { StringSelectMenuBuilder } = require("discord.js");
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
  name: "ticketEmbed",
  data: new SlashCommandBuilder()
    .setName("ticket-embed")
    .setDescription("Create the ticket embed.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    const ticketEmbed = new EmbedBuilder()
      .setColor(0xc026d3)
      .setTitle("Click To Open A Ticket")
      .setDescription(
        "Click the button below to choose a ticket type related to what your ticket is for. Please remember that you can only open one ticket at a time."
      );

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("ticketButton")
        .setPlaceholder("Choose A Ticket Type")
        .addOptions(
          { label: "Support", value: "support" },
          { label: "Services", value: "services" }
        )
    );

    const channel = interaction.guild.channels.cache.get(
      guilds[interaction.guildId].buyHereChannel
    );

    channel.send({ embeds: [ticketEmbed], components: [row] });

    interaction.reply({
      content: "The ticket embed has been created.",
      ephemeral: true,
    });
  },
};
