const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

module.exports.scrapeRestaurant = async page => {
  const payload = {
    'page' : page,
    'request_id' : 'c2017c5c4acb3217c38c57d3f4584467'
  }

  const options= {
    'url' : 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
    'method' : 'POST',
    //'headers' : {'content-type':'application/x-www-form-urlencoded'},
    'data' : querystring.stringify(payload)
  };
  const response = await axios(options);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseRestaurant(data);
  }
  console.error(status);
  return null;
};

const parseRestaurant = data => {
  const $ = cheerio.load(data);
  const url =[];
  $('body').find('.annuaire_result_list').children().each((i, elem) => {
    const link = $("div div a",element).attr('href');
    url.push(link);
  });

  return url;
};

module.exports.get = () => {
  return [];
};
