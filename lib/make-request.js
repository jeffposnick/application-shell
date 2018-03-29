const {html} = require('common-tags');
const fetch = require('node-fetch');

async function index() {
  const url = 'https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow';
  const response = await fetch(url);
  const json = await response.json();
  return json.items.map((item) => {
    return html`<div>
      <a href="/question/${item.question_id}">${item.title}</a>
    </div>`;
  }).join('');
}

async function question(questionId) {
  console.log(questionId);
  const url = `https://api.stackexchange.com/2.2/questions/${questionId}?site=stackoverflow&filter=!-*jbN-o9Aeie`;
  const response = await fetch(url);
  const json = await response.json();
  const item = json.items[0];
  return html`<div>
    <div>${item.title}</div>
    <div>${item.body}</div>
  </div>`;
}

module.exports = {
  index,
  question,
};
