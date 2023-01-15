const { BaseInteraction, Client, EmbedBuilder } = require("discord.js");
const logger = require("../../utils/logger");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {BaseInteraction} interaction
   * @param {Client} client
   */
  execute: (client, _, interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command)
        return interaction.reply({
          content: "This command is outdated.",
          ephemeral: true,
        });

      if (command.developer && interaction.user.id !== "965192559427194930")
        return interaction.reply({
          content: "This command is only available to the developer.",
          ephemeral: true,
        });

      logger
        .custom(`command.logger`)
        .info(`${interaction.user.username} used the ${command.name} command.`);

      const commandLogEmbed = new EmbedBuilder()
        .setColor(0x34d399)
        .setThumbnail(interaction.user.avatarURL())
        .addFields(
          { name: "Command Name", value: command.name, inline: true },
          { name: "Username", value: interaction.user.username, inline: true }
        )
        .setTimestamp()
        .setFooter({
          text: "Autobot Command Logger",
          iconURL: client.user.avatarURL(),
        });

      client.channels.cache
        .get(process.env.LOG_CHANNEL_ID)
        .send({ embeds: [commandLogEmbed] });

      command.execute(
        interaction,
        client,
        logger.custom(`command.${command.name}`)
      );
    }

    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);

      if (!button)
        return interaction.reply({
          content: "This button is outdated.",
          ephemeral: true,
        });

      if (button.developer && interaction.user.id !== process.env.DEVELOPER_ID)
        return interaction.reply({
          content: "This button is only available to the developer.",
          ephemeral: true,
        });

      logger
        .custom(`button.logger`)
        .info(`${interaction.user.username} used the ${button.name} button.`);

      const buttonLogEmbed = new EmbedBuilder()
        .setColor(0x34d399)
        .setThumbnail(interaction.user.avatarURL())
        .addFields(
          { name: "Button Name", value: button.name, inline: true },
          { name: "Username", value: interaction.user.username, inline: true }
        )
        .setTimestamp()
        .setFooter({
          text: "Autobot Button Logger",
          iconURL: client.user.avatarURL(),
        });

      client.channels.cache
        .get(process.env.LOG_CHANNEL_ID)
        .send({ embeds: [buttonLogEmbed] });

      button.execute(
        interaction,
        client,
        logger.custom(`button.${button.name}`)
      );
    }
  },
};
