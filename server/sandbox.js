/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');



async function sandbox_Restaurant (searchLink = 'https://guide.michelin.com/fr/fr/auvergne-rhone-alpes/grenoble/restaurant/le-rousseau') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeRestaurant(searchLink);

    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_Page (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapePage(searchLink);

    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

sandbox_Page(searchLink);
