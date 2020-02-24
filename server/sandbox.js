/* eslint-disable no-console, no-process-exit */
const axios = require('axios');
const cheerio = require('cheerio');
const michelin = require('./michelin');



async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand') {
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

async function sandbox_Page (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/2') {
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

async function sandbox_restaurant () {
  try {

    console.log(`🕵️‍♀️  browsing test source`);

    const url_restaurant =[];
    for (let i = 1; i < 29; i++) {
      url_restaurant.push(('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i).attr('href'));
      console.log(url_restaurant[i]);
  ;
  }

    console.log(url_restaurant);
    for (let i = 1; i < 29; i++) {
      item = await michelin.scrapePage(url_restaurant[i]);
      console.log(item);
  }


    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

sandbox_restaurant(searchLink);
