const { GuildMember } = require("discord.js");
const {
  Client,
  User,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitFiel,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "guildMemberAdd",
  once: true,
  /**
   *
   * @param {Client} client
   * @param {any} logger
   * @param {GuildMember} member
   */
  execute: (client, logger, member) => {
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    const ticketEmbed = new EmbedBuilder()
      .setColor(0xc026d3)
      .setTitle("Welcome To Cyclone Services")
      .setDescription(
        "Welcome **" +
          member.username +
          " to the discord.\n\nThere are now " +
          member.guild.memberCount +
          " members."
      )
      .setColor(0xc026d3)
      .setTimestamp()
      .setFooter({
        text: "https://cycloneservices.co.za",
        iconURL: member.guild.iconURL(),
      });

    const channel = member.guild.channels.cache.get(
      guilds[member.guild.id].welcomeChannel
    );

    channel.send({ embeds: [ticketEmbed] });
  },
};
