const { Client, ButtonInteraction, User, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  name: "closeTicket",
  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute: async (interaction, client, logger) => {
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    if (
      !interaction.member.roles.cache.has(guilds[interaction.guildId].adminRole)
    )
      return interaction.reply({
        content: "Only a staff member can use that.",
        ephemeral: true,
      });

    interaction.reply({
      content:
        "This ticket will be closed in 3 seconds. All users of the ticket will receive a transcript.",
      ephemeral: true,
    });

    const tickets = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "tickets.json"), {
        encoding: "utf-8",
      })
    );

    const attachment = await createTranscript(interaction.channel, {
      poweredBy: false,
      footerText:
        interaction.channel.name + "-transcript of {number} messages.",
    });

    interaction.guild.channels.cache
      .get(interaction.channelId)
      .members.forEach((member) => {
        member.send({ files: [attachment] });
      });

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
