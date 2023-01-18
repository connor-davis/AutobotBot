const { Client, ButtonInteraction } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "verifyButton",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    const guilds = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), { encoding: "utf-8" }));

    if (interaction.member.roles.cache.some(role => role.id === guilds[interaction.guildId].memberRole)) return;

    const memberRole = interaction.guild.roles.cache.find(role => role.id === guilds[interaction.guildId].memberRole);

    interaction.member.roles.add(memberRole);

    interaction.reply({ content: "You have been verified. Welcome to Autobot Macros!", ephemeral: true });
  },
};
