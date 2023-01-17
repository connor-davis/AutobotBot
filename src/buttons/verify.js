const { Client, ButtonInteraction } = require("discord.js");

module.exports = {
  name: "verifyButton",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    if (interaction.member.roles.cache.some(role => role.id === process.env.MEMBER_ROLE_ID)) return;

    const memberRole = interaction.guild.roles.cache.find(role => role.id === process.env.MEMBER_ROLE_ID);

    interaction.member.roles.add(memberRole);

    interaction.reply({ content: "You have been verified. Welcome to Autobot Macros!", ephemeral: true });
  },
};
