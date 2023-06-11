const { IgApiClient, AccountFollowingFeed } =  require('instagram-private-api');
const { sample } = require('lodash');
require('dotenv').config();


const ig = new IgApiClient();
console.log("ok")
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);

(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  //const followersFeed = ig.feed.accountFollowers(auth.pk);
  //const wholeResponse = await followersFeed.request();
  //console.log(wholeResponse); // You can reach any properties in instagram response
  console.log(await ig.qp.batchFetch(auth.pk))
})();