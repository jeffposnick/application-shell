const PREFIX = `https://api.stackexchange.com/2.2`;

export function listQuestionsForTag(tag) {
  return `${PREFIX}/questions?pagesize=100&order=desc&sort=votes&tagged=` +
    `${encodeURIComponent(tag)}&site=stackoverflow&filter=!C(o*VY))7BGSrm5xK`;
}

export function getQuestion(questionId) {
  return `${PREFIX}/questions/${encodeURIComponent(questionId)}?site=` +
    `stackoverflow&filter=!E-NoEOOqk.KxiVtgwUSr(q72V0fqfidE4Y)th*`;
}
