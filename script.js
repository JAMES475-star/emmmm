
const pairs = [
  { name: "勝 × 凝", score: 1, events: [], history: [] },
  { name: "熊 × 張", score: 1, events: [], history: [] },
  { name: "張 × 芊", score: 1, events: [], history: [] },
  { name: "芊 × 梁", score: 1, events: [], history: [] }
];
let profile = {
  nickname: "匿名使用者",
  avatar: "",
  coins: 100,
  holdings: []
};

function renderPairs() {
  const list = document.getElementById('pair-list');
  const select = document.getElementById('pairSelect');
  list.innerHTML = '';
  select.innerHTML = '';

  pairs.forEach((pair, index) => {
    const div = document.createElement('div');
    div.className = 'pair';
    div.innerHTML = `
      <h3>${pair.name}</h3>
      <p>戀愛股價：<strong>${pair.score.toFixed(2)}</strong></p>
      <button onclick="invest(${index})">投資 ❤️</button>
      <ul>${pair.events.map(e => `<li>📝 ${e}</li>`).join('')}</ul>
    `;
    list.appendChild(div);

    const option = document.createElement('option');
    option.value = index;
    option.textContent = pair.name;
    select.appendChild(option);
  });
}

function invest(index) {
  const amount = 1;
  if (profile.coins >= amount) {
    profile.coins -= amount;
    profile.holdings.push(pairs[index].name);
    pairs[index].score += 1;
    pairs[index].history.push(pairs[index].score);
    renderPairs();
  } else {
    alert("你的幣不夠！");
  }
}

function submitEvent() {
  const index = document.getElementById('pairSelect').value;
  const type = document.getElementById('eventType').value;
  const text = document.getElementById('eventText').value.trim();

  if (!text) return alert("請輸入事件內容");

  let effect = 0;
  if (type === 'positive') effect = 1.2;
  else if (type === 'negative') effect = -1;
  else if (type === 'together') effect = 50;
  else if (type === 'breakup') effect = -2 * pairs[index].score;

  pairs[index].score = Math.max(0, pairs[index].score + effect);
  pairs[index].events.push(text + ` (${type})`);
  pairs[index].history.push(pairs[index].score);
  document.getElementById('eventText').value = '';
  renderPairs();
}

function saveProfile() {
  profile.nickname = document.getElementById('nicknameInput').value || profile.nickname;
  profile.avatar = document.getElementById('avatarInput').value;
  renderProfile();
}

function renderProfile() {
  const div = document.getElementById('profileDisplay');
  div.innerHTML = `
    <p>暱稱：${profile.nickname}</p>
    ${profile.avatar ? `<img src="${profile.avatar}" width="100" alt="頭像"/>` : ''}
    <p>剩餘幣值：${profile.coins}</p>
    <p>持有股票：${profile.holdings.join(', ')}</p>
  `;
}

function showSection(section) {
  document.getElementById('market-section').style.display = section === 'market' ? 'block' : 'none';
  document.getElementById('profile-section').style.display = section === 'profile' ? 'block' : 'none';
}

renderPairs();
renderProfile();
