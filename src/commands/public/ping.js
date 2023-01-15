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
      .setColor(0x34d399)
      .addFields([
        { name: "WS Latency", value: client.ws.ping + "ms" },
        {
          name: "Latency",
          value: m.createdTimestamp - message.createdTimestamp + "ms",
        },
      ])
      .setFooter({
        text: "Requested by " + interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.reply({ embeds: [pingEmbed], ephemeral: true });
  },
};
