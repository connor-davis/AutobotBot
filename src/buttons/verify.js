const { Client, ButtonInteraction } = require("discord.js");

module.exports = {
  name: "verify",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    interaction.reply({
      content: "Pong",
      ephemeral: true,
    });
  },
};
