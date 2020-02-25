const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

module.exports.scrapeRestaurant = async page => {
  const payload = {
    'page' : page,
    'request_id' : 'f1ff8fe124d5b47829c45d5900d5a41d'
  }

  const options= {
    'url' : 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
    'method' : 'POST',
    'headers' : {'content-type':'application/x-www-form-urlencoded'},
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
  $('a.annuaire_result_list').each((i,element) => {
    const link = $(element).attr('href');
    url.push(link);
  });

  console.log('url');

  return url;
};

module.exports.get = () => {
  return [];
};
