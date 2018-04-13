const fetch = require('node-fetch');
const fse = require('fs-extra');
const functions = require('firebase-functions');
const path = require('path');

const templates = require('../build/templates');
const urls = require('../build/urls');

let partialCache;
async function loadPartials() {
  if (!partialCache) {
    const readFilePromises = [
      'head.html',
      'navbar.html',
      'about.html',
      'foot.html',
    ].map((name) => path.join('..', 'www', 'partials', name))
     .map((filePath) => fse.readFile(filePath, 'utf-8'));
    const [head, navbar, about, foot] = await Promise.all(readFilePromises);
    partialCache = {head, navbar, about, foot};
  }

  return partialCache;
}

const index = async (request, response) => {
  const partials = await loadPartials();
  const indexResponse = await fetch(urls.index());
  const json = await indexResponse.json();
  const items = json.items;
  const html = partials.head +
    partials.navbar +
    templates.index(items) +
    partials.foot;
  response.status(200).send(html);
};

const questions = async (request, response) => {
  const partials = await loadPartials();
  const questionId = request.url.split('/').pop();
  const questionsResponse = await fetch(urls.questions(questionId));
  const json = await questionsResponse.json();
  const item = json.items[0];
  const html = partials.head +
    partials.navbar +
    templates.question(item) +
    partials.foot;
  response.status(200).send(html);
};

const about = async (request, response) => {
  const partials = await loadPartials();
  const html = partials.head +
    partials.navbar +
    partials.about +
    partials.foot;
  response.status(200).send(html);
};

module.exports.handleRequest = functions.https.onRequest(async (request, response) => {
  if (request.url === '/') {
    return index(request, response);
  }

  if (request.url === '/about') {
    return about(request, response);
  }

  if (request.url.startsWith('/questions/')) {
    return questions(request, response);
  }

  response.status(404);
});
