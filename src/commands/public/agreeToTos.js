const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "agreetoterms",
  data: new SlashCommandBuilder()
    .setName("agreetoterms")
    .setDescription(
      "Use this command to agree to the terms of service of Cyclone Services."
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: (interaction, client, logger) => {
    interaction.reply({ content: "Command worked.", ephemeral: true });
  },
};
