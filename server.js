// server.js
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');

const get = username => {
  const url = 'https://mobile.twitter.com/' + username;
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      const $ = cheerio.load(body);

      resolve(($('.avatar img').attr('src') || '').replace('_normal', '_400x400'));
    });
  });
}


// init project
const express = require('express');
const app = express();

app.use(cors())

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/:user', async (req, res, next) => {
  const result = await get(req.params.user)
  if (!result) return next(404);
  request(result).pipe(res);
});

app.get('/:user.json', async (req, res, next) => {
  const url = await get(req.params.user)
  if (!url) return res.status(404).json({ url: null });
  res.json({ url });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
