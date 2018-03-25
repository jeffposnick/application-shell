const {html} = require('common-tags');
const fetch = require('node-fetch');
const fse = require('fs-extra');
const functions = require('firebase-functions');
const path = require('path');

let partialCache;
async function loadPartials() {
  if (!partialCache) {
    const readFilePromises = ['head.html', 'sidebar.html', 'foot.html']
      .map((name) => path.join('..', 'public', 'partials', name))
      .map((filePath) => fse.readFile(filePath, 'utf-8'));
    const [head, sidebar, foot] = await Promise.all(readFilePromises);
    partialCache = {head, sidebar, foot};
  }

  return partialCache;
}

async function requestIndex() {
  const url = 'https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow';
  const response = await fetch(url);
  const json = await response.json();
  return json.items.map((item) => {
    return html`<p><a href="${item.link}">${item.title}</a></p>`;
  }).join('');
}

module.exports.index = functions.https.onRequest(async (request, response) => {
  const partials = await loadPartials();
  const body = await requestIndex();
  const html = partials.head + partials.sidebar + body + partials.foot;
  response.status(200).send(html);
});