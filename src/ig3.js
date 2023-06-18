let { igApi, getCookie } = require("insta-fetcher");
// using constructor
let ig = new igApi("your cookie");

// you can get sesion id by using getSessionId function, it requires username & passwor
try {
    ig.fetchUserV2("helper.fenorocky").then((res) => {
        console.log(res)
    });
}
catch(err) {
    console.log(err)
}

/*const igConfig = {
    username: process.env.IG_USERNAME,
    password: process.env.IG_PASSWORD
}*/

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