const { User } = require("discord.js");
const {
  Client,
  StringSelectMenuInteraction,
  ChannelType,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ticketButton",
  /**
   * @param {StringSelectMenuInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    console.log(guilds[interaction.guildId]);

    console.log(interaction.member.roles.includes(guilds[interaction.guildId].tosRole));

    // client.guilds.cache
    //   .get(interaction.guildId)
    //   .roles.fetch(guilds[interaction.guildId].tosRole)
    //   .then((role) => {
    //     for (let member in role.members) {
    //       if (member instanceof User) {
    //         if (member.id === interaction.user.id) {
    //           const existing = client.guilds.cache
    //             .get(interaction.guildId)
    //             .channels.cache.find(
    //               (channel) =>
    //                 channel.name === "ticket-" + interaction.user.username
    //             );

    //           if (existing)
    //             return interaction.reply({
    //               content:
    //                 "You already have a ticket, please close your ticket before opening a new one.",
    //               ephemeral: true,
    //             });
    //           else {
    //             interaction.reply({
    //               content:
    //                 "Your ticket will be created shortly. Please be patient and wait for staff to assist you.",
    //               ephemeral: true,
    //             });

    //             client.guilds.cache
    //               .get(interaction.guildId)
    //               .channels.create({
    //                 name: "ticket-" + interaction.user.username,
    //                 type: ChannelType.GuildText,
    //                 topic:
    //                   "Ticket type: " + interaction.values.length > 1
    //                     ? interaction.values.join(",")
    //                     : interaction.values[0] || "support",
    //                 parent: guilds[interaction.guildId].ticketsCategory,
    //                 permissionOverwrites: [
    //                   {
    //                     id: interaction.user.id,
    //                     allow: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                   {
    //                     id: guilds[interaction.guildId].ownerRole,
    //                     allow: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                   {
    //                     id: guilds[interaction.guildId].adminRole,
    //                     allow: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                   {
    //                     id: guilds[interaction.guildId].helperRole,
    //                     allow: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                   {
    //                     id: guilds[interaction.guildId].botRole,
    //                     allow: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                   {
    //                     id: guilds[interaction.guildId].everyoneRole,
    //                     deny: [
    //                       PermissionsBitField.Flags.ViewChannel,
    //                       PermissionsBitField.Flags.SendMessages,
    //                       PermissionsBitField.Flags.ReadMessageHistory,
    //                     ],
    //                   },
    //                 ],
    //               })
    //               .then((channel) => {
    //                 const tickets = JSON.parse(
    //                   fs.readFileSync(
    //                     path.join(process.cwd(), "data", "tickets.json"),
    //                     {
    //                       encoding: "utf-8",
    //                     }
    //                   )
    //                 );

    //                 const ticketData = {
    //                   ticketSubject: interaction.user.id,
    //                   ticketStaffRoles: [
    //                     guilds[interaction.guildId].ownerRole,
    //                     guilds[interaction.guildId].adminRole,
    //                     guilds[interaction.guildId].helperRole,
    //                     guilds[interaction.guildId].botRole,
    //                   ],
    //                   everyoneId: guilds[interaction.guildId].everyoneRole,
    //                   channelId: channel.id,
    //                   locked: false,
    //                 };

    //                 tickets[channel.id] = ticketData;

    //                 fs.writeFileSync(
    //                   path.join(process.cwd(), "data", "tickets.json"),
    //                   JSON.stringify(tickets),
    //                   { encoding: "utf-8" }
    //                 );

    //                 const ticketEmbed = new EmbedBuilder()
    //                   .setColor(0xc026d3)
    //                   .setTitle("Cyclone Services Ticket")
    //                   .setDescription(
    //                     "Please be patient and wait for staff to assist you. If you want to purchase services, you can use the /payment command when you are ready to pay."
    //                   )
    //                   .addFields({
    //                     name: "Ticket Type",
    //                     value:
    //                       interaction.values.length > 1
    //                         ? interaction.values.join(",")
    //                         : interaction.values[0] || "support",
    //                   })
    //                   .setTimestamp()
    //                   .setFooter({
    //                     text: "Created by: " + interaction.user.username,
    //                     iconURL: interaction.user.avatarURL(),
    //                   });

    //                 const row = new ActionRowBuilder().addComponents(
    //                   new ButtonBuilder()
    //                     .setCustomId("lockTicket")
    //                     .setLabel("🔒 Lock")
    //                     .setStyle(ButtonStyle.Secondary),
    //                   new ButtonBuilder()
    //                     .setCustomId("closeTicket")
    //                     .setLabel("❌ Close")
    //                     .setStyle(ButtonStyle.Secondary)
    //                 );

    //                 channel.send({ embeds: [ticketEmbed], components: [row] });
    //               });
    //           }
    //         }
    //       }
    //     }
    //   });
  },
};
