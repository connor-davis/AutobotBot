/**
 * This is thanks to Lyxcode for helping me refresh on YouTube.
 */
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const { loadEvents } = require("./handlers/eventHandler");

dotenv.config();

const Autobot = async () => {
  const autobotClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
    ],
    partials: [
      Partials.User,
      Partials.Message,
      Partials.GuildMember,
      Partials.ThreadMember,
    ],
  });

  autobotClient.events = new Collection();
  autobotClient.commands = new Collection();
  autobotClient.buttons = new Collection();
  autobotClient.selectMenus = new Collection();

  await loadEvents(autobotClient);

  let i = 0;

  autobotClient
    .login(process.env.TOKEN)
    .then(() => {
      logger.success("Autobot has logged in to Discord.");
      
      setInterval(() => {
        if (i === 0) {
          autobotClient.user.setActivity("https://auto-bot.co.za");
          i++;
        } else {
          autobotClient.user.setActivity("https://cycloneservices.co.za");
          i--;
        }
      }, 5000);
    })
    .catch((error) => {
      logger.error(error);
    });

  return autobotClient;
};

module.exports = Autobot;
