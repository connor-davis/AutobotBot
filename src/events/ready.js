const { loadButtons } = require("../handlers/buttonHandler");
const {loadCommands} = require("../handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute: (client, logger, ...args) => {
        logger.info("Autobot is ready.")

        loadCommands(client);
        loadButtons(client);
    }
}