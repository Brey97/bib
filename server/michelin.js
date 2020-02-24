const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parseRestaurant = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();
  const adresse =$('.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();

  return {name, experience,adresse};
};

//#experience-section > ul > li:nth-child(2)

/**\
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseRestaurant(data);
  }
  console.error(status);
  return null;
};

module.exports.scrapePage = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parsePage(data);
  }
  console.error(status);
  return null;
};

module.exports.scrapeBib = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseBib(data);
  }

  console.error(status);

  return null;
};


const parsePage = data => {
  const $ = cheerio.load(data);
  const url =[];
  for (let i = 1; i < 22; i++) {

    url.push('https://guide.michelin.com'+$('.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child('+i+') > div > a').attr('href'));

}
	url.splice(8,1);

  return url;
};

const parseBib = data => {
  const $ = cheerio.load(data);
  const url_restaurant =[];
  for (let i = 1; i < 29; i++) {
    url_restaurant.push('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i).attr('href');
}
  const url_total=[];
  for (let i = 1; i < 29; i++) {
    url_restaurant.push('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i).attr('href');
}

  return url;
};



/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
