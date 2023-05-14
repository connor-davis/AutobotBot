const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "payment",
  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("Receive my payment details.")
    .addStringOption((option) =>
      option
        .setName("person")
        .setDescription("Please choose the person you are paying.")
        .addChoices(
          { name: "Quixy", value: "quixy" },
          { name: "Despair", value: "despair" },
          { name: "Oom Cyril", value: "oomcyril" }
          { name: "NOTABOT", value: "notabot" }
        )
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute: (interaction, client, logger) => {
    switch (interaction.options.getString("person")) {
      case "quixy":
        const quixyPaymentInfoEmbed = new EmbedBuilder()
          .setTitle("Cyclone Payment Details")
          .setDescription(
            "Below you can find payment details for purchasing from Quixy Cyclone Services. If you are paying with paypal, please pay with friends and family. If you are paying to bank account, please use instant transfer."
          )
          .setColor(0xc026d3)
          .addFields([
            {
              name: "Paypal",
              value: "https://paypal.me/CycloneServices",
            },
            {
              name: "Bank Account Number",
              value: "2080761559",
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
            text: "Requested by: " + interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({ embeds: [quixyPaymentInfoEmbed] });
        break;
      case "despair":
        const despairPaymentInfoEmbed = new EmbedBuilder()
          .setTitle("Cyclone Payment Details")
          .setDescription(
            "Below you can find payment details for purchasing from Despair Cyclone Services. If you are paying with paypal, please pay with friends and family. If you are paying to bank account, please use instant transfer."
          )
          .setColor(0xc026d3)
          .addFields([
            {
              name: "Paypal",
              value: "https://paypal.me/cdvsdev",
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
            text: "Requested by: " + interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({
          embeds: [despairPaymentInfoEmbed],
        });
        break;
      case "oomcyril":
        const oomCyrilPaymentInfoEmbed = new EmbedBuilder()
          .setTitle("Cyclone Payment Details")
          .setDescription(
            "Below you can find payment details for purchasing from Oom Cyril Cyclone Services. If you are paying with paypal, please pay with friends and family. If you are paying to bank account, please use instant transfer."
          )
          .setColor(0xc026d3)
          .addFields([
            {
              name: "Paypal",
              value: "https://paypal.me/GTAMONEYSERVICE943",
            },
            {
              name: "Bank Account Number",
              value: "10129143608",
              inline: true,
            },
            {
              name: "Bank Branch Code",
              value: "051001",
              inline: true,
            },
            {
              name: "Bank Name",
              value: "Standard Bank",
              inline: true,
            },
          ])
          .setFooter({
            text: "Requested by: " + interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({ embeds: [oomCyrilPaymentInfoEmbed] });
        break;
      case "notabot":
        const notabotPaymentInfoEmbed = new EmbedBuilder()
          .setTitle("Cyclone Payment Details")
          .setDescription(
            "Below you can find payment details for purchasing from NOTABOT Cyclone Services. If you are paying with paypal, please pay with friends and family. If you are paying to bank account, please use instant transfer."
          )
          .setColor(0xc026d3)
          .addFields([
            {
              name: "Paypal",
              value: "https://www.paypal.me/ReubenMott",
            },
            {
              name: "Bank Account Number",
              value: "1976731761",
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
            text: "Requested by: " + interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.reply({ embeds: [oomCyrilPaymentInfoEmbed] });
        break;
      default:
        break;
    }
  },
};
