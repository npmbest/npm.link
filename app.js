'use strict';

/**
 * npm.link
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const connect = require('connect');

const port = process.env.PORT;
if (!(port > 0)) {
  throw new Error('please set up a port: `port=xxx`');
}

const url = 'https://www.npmjs.com/';

const app = connect();

app.use(function (req, res, next) {

  if (req.url.indexOf('/favicon.ico') === 0) {
    res.end();
  } else {
    next();
  }

})

app.use(function (req, res, next) {

  const name = req.url.slice(1).trim();
  let location = `${url}package/${name}`;
  if (!name) location = url;

  res.writeHead(302, {location});
  res.end();

  console.log(`request: ${Date.now()} ${name} ${req.url} => ${location}`);

});

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`info: server listening on port ${port}`);
  }
});
