const { Client, ButtonInteraction } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ticketButton",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    interaction.reply({
      content:
        "Your ticket will be opened shortly. Please be patient while a staff member gets back to you.",
      ephemeral: true,
    });
  },
};
