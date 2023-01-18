module.exports = {
    name: "ready",
    once: false,
    execute: (client, logger, ...args) => {
        logger.info("Autobot got removed from: " + args.guild.name);
    }
}