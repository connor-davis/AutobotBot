/**
 * This is thanks to Lyxcode for helping me refresh on YouTube.
 */
const logger = require("../utils/logger");

const loadCommands = async (autobotClient) => {
    const {loadFiles} = require("../functions/fileLoader");
    const asciiTable = require("ascii-table");
    const table = new asciiTable().setHeading("Command", "Status")

    await autobotClient.commands.clear();

    let commandsArray = [];

    const files = await loadFiles("commands");

    files.forEach((file) => {
        const command = require(file);

        try {
            autobotClient.commands.set(command.data.name, command);

            commandsArray.push(command.data.toJSON());

            table.addRow(command.name, "🟢");
        } catch (e) {
            table.addRow(command.name, "🔴");
        }
    });

    autobotClient.application.commands.set(commandsArray);

    console.log(table.toString());

    logger.success("Loaded Commands.");
};

module.exports = {
    loadCommands
}