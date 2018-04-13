async function index() {
  const url = 'https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=votes&tagged=service-worker&site=stackoverflow&filter=!C(o*VY))7BGSrm5xK';
  const response = await fetch(url);
  const json = await response.json();
  return json.items.map((item) => {
    return `<div>
  <a href="/questions/${item.question_id}">${item.title}</a>
</div>`;
  }).join('');
}

async function question(questionId) {
  const url = `https://api.stackexchange.com/2.2/questions/${questionId}?site=stackoverflow&filter=!E-NoEOOqk.KxiVtgwUSr(q72V0fqfidE4Y)th*`;
  const response = await fetch(url);
  const json = await response.json();
  const item = json.items[0];
  const question = `<h1>${item.title}</h1>
<div>${item.body}</div>
<div>
  <img class="profile" src="${item.owner.profile_image}" title="Profile image for ${item.owner.display_name}">
  <a href="${item.owner.link}">${item.owner.display_name}</a> asked this on
  <a href="${item.link}">${new Date(item.creation_date * 1000).toLocaleString()}</a>.
</div>`;

  const answers = item.answers.map((answer) => {
    return `<div>${answer.body}</div>
<div>
  <img class="profile" src="${answer.owner.profile_image}" title="Profile image for ${answer.owner.display_name}">
  <a href="${answer.owner.link}">${answer.owner.display_name}</a> answered this.
</div>`;
  }).join('<hr>');

  return question + '<hr>' + answers;
}

module.exports = {
  index,
  question,
};
