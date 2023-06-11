const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const IgClient = require('instagram-private-api');

const discordConfig = {
    botToken: process.env.DISCORD_BOT_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    guildId: process.env.DISCORD_GUILD_ID
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, '/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	
    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const igConfig = {
    username: process.env.IG_USERNAME,
    password: process.env.IG_PASSWORD
}

/*const ig = new IgClient();
ig.state.generateDevice(igConfig.username)

(async () => {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(igConfig.username, igConfig.password);
    console.log(loggedInUser.pk)
})*/


/*client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  
    Client.Session.create(new Client.Device(username), new Client.CookieMemoryStorage(), username, password)
      .then(session => {
        const feed = new Client.Feed.UserMedia(session, 'private-account-user-id');
        let lastMediaId;
  
        setInterval(() => {
          feed.get().then(media => {
            const newMedia = media[0];
  
            if (newMedia.id !== lastMediaId) {
              const channel = client.channels.cache.get(channelId);
              const embed = new Discord.MessageEmbed()
                .setTitle('New post on Instagram!')
                .setURL(`https://www.instagram.com/p/${newMedia.params.shortcode}`)
                .setImage(newMedia.params.images[0].url)
                .setDescription(newMedia.params.caption)
                .setTimestamp(newMedia.takenAt)
                .setFooter('Footer')
                .setColor('#E4405F');
  
              channel.send(embed);
  
              lastMediaId = newMedia.id;
            }
          });
        }, 60000); // Check every minute for new posts
      })
      .catch(err => {
        console.error(err);
      });
  });*/
  
  client.login(discordConfig.botToken);
