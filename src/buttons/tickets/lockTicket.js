const { PermissionsBitField } = require("discord.js");
const {
  Client,
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "lockTicket",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    const guilds = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), { encoding: "utf-8" }));

    if (
      !interaction.member.roles.cache.has(guilds[interaction.guildId].adminRole)
    )
      return interaction.reply({
        content: "Only a staff member can use that.",
        ephemeral: true,
      });

    const tickets = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "tickets.json"), {
        encoding: "utf-8",
      })
    );

    const ticket = tickets[interaction.channel.id];

    const ticketPermissions = [
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.ReadMessageHistory,
    ];

    if (!ticket)
      return interaction.reply({
        content: "The ticket does not exist.",
        ephemeral: true,
      });

    if (!ticket.locked) {
      interaction.channel.permissionOverwrites.set([
        {
          id: ticket.ticketSubject,
          deny: [PermissionsBitField.Flags.SendMessages],
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
        },
        {
          id: ticket.ticketStaffRoles[0],
          allow: ticketPermissions,
        },
        {
          id: ticket.ticketStaffRoles[1],
          allow: ticketPermissions,
        },
        {
          id: ticket.ticketStaffRoles[2],
          allow: ticketPermissions,
        },
        {
          id: ticket.everyoneId,
          deny: ticketPermissions,
        },
      ]);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("lockTicket")
          .setLabel("🔓 Unlock")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("closeTicket")
          .setLabel("❌ Close")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.update({ components: [row] });

      ticket.locked = true;

      tickets[ticket.channelId] = ticket;

      fs.writeFileSync(
        path.join(process.cwd(), "data", "tickets.json"),
        JSON.stringify(tickets),
        { encoding: "utf-8" }
      );
    } else {
      interaction.channel.permissionOverwrites.set([
        {
          id: ticket.ticketSubject,
          allow: ticketPermissions,
        },
        {
          id: ticket.ticketStaffRoles[0],
          allow: ticketPermissions,
        },
        {
          id: ticket.ticketStaffRoles[1],
          allow: ticketPermissions,
        },
        {
          id: ticket.ticketStaffRoles[2],
          allow: ticketPermissions,
        },
        {
          id: ticket.everyoneId,
          deny: ticketPermissions,
        },
      ]);

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

      interaction.update({ components: [row] });

      ticket.locked = false;

      tickets[ticket.channelId] = ticket;

      fs.writeFileSync(
        path.join(process.cwd(), "data", "tickets.json"),
        JSON.stringify(tickets),
        { encoding: "utf-8" }
      );
    }
  },
};
