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

    const restaurants = await michelin.scrapePage(searchLink);

    console.log(restaurants);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_Bib (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurants = await michelin.scrapePage(searchLink);
    const restaurants2;

    for each (var item in restaurants) {

      restaurants2 = await michelin.scrapeRestaurant()
      console.log(restaurants2);
    }


    console.log(restaurants);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, searchLink] = process.argv;

sandbox_Page(searchLink);
