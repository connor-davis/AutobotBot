module.exports = {
    name: "guildCreate",
    once: false,
    execute: (client, logger, ...args) => {
        logger.info("Autobot got added to: " + args);
    }
}