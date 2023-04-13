const { GuildMember } = require("discord.js");
const { MessageReaction } = require("discord.js");
const { ReactionEmoji } = require("discord.js");
const {
  Client,
  User,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitFiel,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "messageReactionAdd",
  /**
   *
   * @param {Client} client
   * @param {any} logger
   * @param {MessageReaction} reaction
   */
  execute: (client, logger, reaction) => {
    const guilds = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), {
        encoding: "utf-8",
      })
    );

    console.log(reaction.emoji.name);
  },
};
