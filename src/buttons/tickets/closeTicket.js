const { Client, ButtonInteraction } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "closeTicket",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: (interaction, client, logger) => {
    if (!interaction.member.roles.cache.has(process.env.ADMIN_ROLE_ID))
      return interaction.reply({
        content: "Only a staff member can use that.",
        ephemeral: true,
      });

    interaction.reply({
      content: "This ticket will be closed in 3 seconds.",
      ephemeral: true,
    });

    const tickets = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "tickets.json"), {
        encoding: "utf-8",
      })
    );

    delete tickets[interaction.channel.id];

    fs.writeFileSync(
      path.join(process.cwd(), "data", "tickets.json"),
      JSON.stringify(tickets),
      { encoding: "utf-8" }
    );

    setTimeout(() => {
      interaction.channel.delete();
    }, 3000);
  },
};
