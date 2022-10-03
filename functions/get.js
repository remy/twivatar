// server.js
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const get = async (username, size) => {
  const timestamp = new Date().toJSON().replace(/\D/g, '');
  const url = `https://web.archive.org/web/${timestamp}/https://twitter.com/${username}`;

  const res = await fetch(url);
  const body = await res.text();

  const $ = cheerio.load(body);

  return (
    `https` +
    ($('main img').eq(1).attr('src') || '')
      .replace(/_(?:(?:\d+)x(?:\d+))\.(jpeg|jpg|gif|png)/, '_' + size + '.$1')
      .split('https')
      .pop()
  );
};

exports.handler = async function (event, context, callback) {
  const { httpMethod } = event;

  if (httpMethod === 'OPTIONS') {
    return callback(null, {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const { username, size = 'normal' } = event.queryStringParameters;
  let url = await get(username, size);
  if (size === 'original') {
    url = url.replace('_original.', '.');
  }

  callback(null, {
    statusCode: 302,
    headers: {
      location: url,
    },
  });
};
