const { Client, ButtonInteraction } = require("discord.js");

module.exports = {
  name: "verifyButton",
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
