const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Will response with pong."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    const pingEmbed = new EmbedBuilder()
      .setTitle("Autobot Ping Information")
      .setColor(0xc026d3)
      .addFields([
        { name: "WS Latency", value: Math.round(client.ws.ping) + "ms" },
        {
          name: "Latency",
          value: Date.now() - interaction.createdTimestamp + "ms",
        },
      ])
      .setFooter({
        text: "Requested by " + interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.reply({ embeds: [pingEmbed], ephemeral: true });
  },
};
