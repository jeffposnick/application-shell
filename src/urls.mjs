const PREFIX = `https://api.stackexchange.com/2.2`;

export function index() {
  return `${PREFIX}/questions?pagesize=100&order=desc&sort=votes&tagged=` +
    `service-worker&site=stackoverflow&filter=!C(o*VY))7BGSrm5xK`;
}

export function questions(questionId) {
  return `${PREFIX}/questions/${questionId}?site=stackoverflow&filter=` +
    `!E-NoEOOqk.KxiVtgwUSr(q72V0fqfidE4Y)th*`;
}
