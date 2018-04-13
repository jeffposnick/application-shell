export function index(items) {
  return items.map((item) => {
    return `<div>
  <a href="/questions/${item.question_id}">${item.title}</a>
</div>`;
  }).join('');
}

export function question(item) {
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
