const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "payment",
  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("Receive my payment details."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: (interaction, client, logger) => {
    const paymentInfoEmbed = new EmbedBuilder()
      .setTitle("Autobot Payment Details")
      .setDescription(
        "Below you can find payment details for purchasing Autobot. If you are paying with paypal, please pay with friends and family. If you are paying to bank account, please use instant transfer."
      )
      .setColor(0x34d399)
      .addFields([
        {
          name: "Paypal",
          value: "https://paypal.me/lonewolftech",
        },
        {
          name: "Bank Account Number",
          value: "1458805830",
          inline: true,
        },
        {
          name: "Bank Branch Code",
          value: "470010",
          inline: true,
        },
        {
          name: "Bank Name",
          value: "Capitec",
          inline: true,
        },
      ])
      .setFooter({
        name: "Requested by: " + interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.reply({ embeds: [paymentInfoEmbed], ephemeral: true });
  },
};
