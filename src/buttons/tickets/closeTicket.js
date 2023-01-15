const { Client, ButtonInteraction } = require("discord.js");

module.exports = {
  name: "closeTicket",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    if (
      !interaction.member.roles.cache.has(process.env.OWNER_ROLE_ID) ||
      !interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID) ||
      !interaction.user.id === process.env.DEVELOPER_ID
    )
      return interaction.reply({
        content: "Only a staff member can use that.",
        ephemeral: true,
      });

    interaction.reply({
      content: "This ticket will be closed in 3 seconds.",
      ephemeral: true,
    });

    setTimeout(() => {
      interaction.channel.delete();
    }, 3000);
  },
};
