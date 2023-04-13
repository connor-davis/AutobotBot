const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

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
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    if (interaction.member.roles.cache.has(guilds[interaction.guildId].tosRole))
      return interaction.reply({
        content:
          "You have already agreed to the terms of service of Cyclone Services.",
        ephemeral: true,
      });
    else {
      const member = interaction.guild.members.cache.find((user) => user.id === interaction.user.id);

      member.roles.add(guilds[interaction.guildId].tosRole);

      interaction.reply({ content: "Thank you for agreeing to the terms of service of Cyclone Services.", ephemeral: true });
    }
  },
};
