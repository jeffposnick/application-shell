const fse = require('fs-extra');
const functions = require('firebase-functions');
const path = require('path');

const makeRequest = require('../lib/make-request');

let partialCache;
async function loadPartials() {
  if (!partialCache) {
    const readFilePromises = ['head.html', 'sidebar.html', 'foot.html']
      .map((name) => path.join('..', 'www', 'partials', name))
      .map((filePath) => fse.readFile(filePath, 'utf-8'));
    const [head, sidebar, foot] = await Promise.all(readFilePromises);
    partialCache = {head, sidebar, foot};
  }

  return partialCache;
}

module.exports.index = functions.https.onRequest(async (request, response) => {
  const partials = await loadPartials();
  const body = await makeRequest.index();
  const html = partials.head + partials.sidebar + body + partials.foot;
  response.status(200).send(html);
});

module.exports.question = functions.https.onRequest(async (request, response) => {
  const partials = await loadPartials();
  const body = await makeRequest.question(request.url.split('/').pop());
  const html = partials.head + partials.sidebar + body + partials.foot;
  response.status(200).send(html);
});
