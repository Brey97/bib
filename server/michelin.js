const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */

const parse = data => {
  const $ = cheerio.load(data);
  const url =[];
  for (let pas = 1; pas < 41; pas++) {
  let links = $('body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child('+pas+') > div > a').attr('href');
  if(typeof(links)!='undefined' && links != '/fr/fr/subscribe')
  {
    url.push(links);
  }

}

  return url;
};

const parseTest = data => {
  const $ = cheerio.load(data);
  const url =[];
  $('a.link').each((i,element) => {
    const link = $(element).attr('href');
    url.push(link);
  });

  console.log(url);

  return url;
};

module.exports.scrapeRestaurantAll = async url => {
  const urls =[];
  for (let pas = 1; pas < 16; pas++) {

    const response = await axios(url+pas);
    console.log(url+pas);
    const {data, status} = response;
    if (status >= 200 && status < 300) {
      urls.push(parseTest(data));
    }

  }

    return urls;

};

module.exports.scrapeRestaurantAll = async url => {
  const urls =[];
  for (let pas = 1; pas < 16; pas++) {

    const response = await axios(url+pas);
    console.log(url+pas);
    const {data, status} = response;
    if (status >= 200 && status < 300) {
      urls.push(parse(data));
    }

  }

    return urls;

};

const parseRestaurant = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text().trim();
  const note = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__heading.d-none.d-lg-block > ul > li.restaurant-details__heading--rating').text().trim();
  const adresse =$('.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text().trim();

  return {name, note,adresse};
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
  console.log('test');

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
