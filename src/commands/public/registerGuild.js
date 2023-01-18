const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "registerGuild",
    data: new SlashCommandBuilder()
        .setName("register-guild")
        .setDescription("Register the server with autobot.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: (interaction, client, logger) => {
        interaction.channel.send({ content: "Gathering guild information for registration." });

        const guild = interaction.guild;
        const guildId = interaction.guildId;

        interaction.channel.send({ content: "Creating required verify channel and tickets category. Note, you can edit the names and other settings of these after." });

        client.guilds.cache.get(guildId).channels.create({
            name: "verify",
            type: ChannelType.GuildText,
        }).then((verifyChannel) => {
            client.guilds.cache.get(guildId).channels.create({
                name: "Autobot Tickets",
                type: ChannelType.GuildCategory
            })
                .then(async (ticketsCategory) => {
                    interaction.channel.send({ content: "Creating the required roles. Note, you can edit the names and other settings of these after." });

                    let ownerRole, adminRole, botRole, memberRole;

                    if (!guild.roles.cache.has("owner")) ownerRole = await client.guilds.cache.get(guildId).roles.create({ name: "owner" });
                    else ownerRole = guild.roles.cache.get("owner").id;

                    if (!guild.roles.cache.has("admin")) ownerRole = await client.guilds.cache.get(guildId).roles.create({ name: "admin" });
                    else ownerRole = guild.roles.cache.get("admin").id;

                    if (!guild.roles.cache.has("bot")) ownerRole = await client.guilds.cache.get(guildId).roles.create({ name: "bot" });
                    else ownerRole = guild.roles.cache.get("bot").id;

                    if (!guild.roles.cache.has("member")) ownerRole = await client.guilds.cache.get(guildId).roles.create({ name: "member" });
                    else ownerRole = guild.roles.cache.get("member").id;

                    const everyoneRole = client.guilds.cache.get(guildId).roles.everyone;

                    const guildSettings = {
                        guild: {
                            name: guild.name,
                            owner: guild.ownerId
                        },
                        verifyChannel: verifyChannel.id,
                        ticketsCategory: ticketsCategory.id,
                        ownerRole: ownerRole.id,
                        adminRole: adminRole.id,
                        botRole: botRole.id,
                        memberRole: memberRole.id,
                        everyoneRole: everyoneRole.id,
                    }

                    try {
                        const guilds = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "guilds.json"), { encoding: "utf-8" }));

                        guilds[guildId] = guildSettings;

                        fs.writeFileSync(path.join(process.cwd(), "data", "guilds.json"), JSON.stringify(guilds), { encoding: "utf-8" });
                    } catch (error) {
                        const guilds = {};

                        guilds[guildId] = guildSettings;

                        fs.writeFileSync(path.join(process.cwd(), "data", "guilds.json"), JSON.stringify(guilds), { encoding: "utf-8" });
                    }

                    const registeredEmbed = new EmbedBuilder()
                        .setColor(0x34d399)
                        .setTitle("Autobot Registered")
                        .setDescription(
                            "This server has been registered with Autobot. 🎉"
                        );

                    interaction.reply({ embeds: [registeredEmbed], ephemeral: true });
                });
        });
    }
};