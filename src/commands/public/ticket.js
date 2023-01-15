const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ticket",
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Use the ticket system of Autobot.")
    .addStringOption((option) =>
      option
        .setName("create")
        .setDescription("Enter the reason for the ticket.")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    interaction.reply({
      content:
        "Your ticket will be created shortly. Please be patient and wait for staff to assist you.",
      ephemeral: true,
    });

    client.guilds.cache
      .get(process.env.GUILD_ID)
      .channels.create({
        name: "ticket-" + interaction.user.username,
        type: ChannelType.GuildText,
        topic: "Ticket type: " + interaction.options.get("create").value,
        parent: process.env.AUTOBOT_TICKETS_CATEGORY_ID,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
          {
            id: process.env.OWNER_ROLE_ID,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
          {
            id: process.env.ADMIN_ROLE_ID,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
          {
            id: process.env.BOT_ROLE_ID,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
          {
            id: process.env.EVERYONE_ID,
            deny: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ],
      })
      .then((channel) => {
        const tickets = JSON.parse(
          fs.readFileSync(path.join(process.cwd(), "data", "tickets.json"), {
            encoding: "utf-8",
          })
        );

        const ticketData = {
          ticketSubject: interaction.user.id,
          ticketStaffRoles: [
            process.env.OWNER_ROLE_ID,
            process.env.ADMIN_ROLE_ID,
            process.env.BOT_ROLE_ID,
          ],
          everyoneId: process.env.EVERYONE_ID,
          channelId: channel.id,
          locked: false,
        };

        tickets[channel.id] = ticketData;

        fs.writeFileSync(
          path.join(process.cwd(), "data", "tickets.json"),
          JSON.stringify(tickets),
          { encoding: "utf-8" }
        );

        const ticketEmbed = new EmbedBuilder()
          .setColor(0x34d399)
          .setTitle("Autobot Ticket")
          .setDescription("Please be patient and wait for staff to assist you.")
          .addFields({
            name: "Ticket Type",
            value: interaction.options.get("create").value,
          })
          .setTimestamp()
          .setFooter({
            text: "Created by: " + interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          });

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("lockTicket")
            .setLabel("🔒 Lock")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("closeTicket")
            .setLabel("❌ Close")
            .setStyle(ButtonStyle.Secondary)
        );

        channel.send({ embeds: [ticketEmbed], components: [row] });
      });
  },
};
