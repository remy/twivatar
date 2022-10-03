import cheerio from 'cheerio';
import fetch from 'node-fetch';

const junk = ['favicon.ico'];

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

export const handler = async function (event, context, callback) {
  const { httpMethod } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  const { username, size = 'normal' } = event.queryStringParameters;

  if (junk.includes(username)) {
    return {
      statusCode: 204,
    };
  }

  let url = await get(username, size);
  if (size === 'original') {
    url = url.replace('_original.', '.');
  }

  return {
    statusCode: 302,
    headers: {
      location: url,
    },
  };
};
