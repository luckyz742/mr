const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// 弹窗控制
const popup = document.getElementById('popup');
document.getElementById('addBtn').addEventListener('click', () => {
  popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
});

// 弹窗按钮行为
popup.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    popup.style.display = 'none';
    document.getElementById('addPage').classList.add('hidden');
    document.getElementById('shakePage').classList.add('hidden');
    document.getElementById('stranger').classList.add('hidden');
    if (btn.dataset.action === 'add-friend') document.getElementById('addPage').classList.remove('hidden');
    if (btn.dataset.action === 'shake') document.getElementById('shakePage').classList.remove('hidden');
  });
});

// 添加好友
document.getElementById('addFriend').addEventListener('click', () => {
  const code = document.getElementById('friendCode').value.trim();
  if (code.length !== 6) return alert('请输入6位好友代码');
  let list = JSON.parse(localStorage.getItem('friends') || '[]');
  list.push({ id: code, name: `好友${code}`, avatar: 'https://i.postimg.cc/nrZH5jZm/1762874639457.jpg' });
  localStorage.setItem('friends', JSON.stringify(list));
  alert('好友已添加');
});

// 删除好友
document.getElementById('delFriend').addEventListener('click', () => {
  const code = document.getElementById('friendCode').value.trim();
  let list = JSON.parse(localStorage.getItem('friends') || '[]');
  list = list.filter(f => f.id !== code);
  localStorage.setItem('friends', JSON.stringify(list));
  alert('好友已删除');
});

// 摇一摇随机用户
const randomUsers = [
  { name: '小明', id: '526314', avatar: 'https://i.postimg.cc/nrZH5jZm/1762874639457.jpg' },
  { name: 'Lucy', id: '789421', avatar: 'https://i.postimg.cc/prx27hxR/1762874743138.jpg' },
  { name: 'David', id: '993112', avatar: 'https://i.postimg.cc/rsc8b0cx/1762874658378.jpg' },
];
document.getElementById('phoneIcon').addEventListener('click', () => {
  const stranger = randomUsers[Math.floor(Math.random() * randomUsers.length)];
  document.getElementById('shakePage').classList.add('hidden');
  document.getElementById('stranger').classList.remove('hidden');
  document.getElementById('sAvatar').src = stranger.avatar;
  document.getElementById('sName').innerText = stranger.name;
  document.getElementById('sID').innerText = 'ID: ' + stranger.id;
});

// 添加摇到的联系人
document.getElementById('addContact').addEventListener('click', () => {
  const name = document.getElementById('sName').innerText;
  const id = document.getElementById('sID').innerText.replace('ID: ', '');
  const avatar = document.getElementById('sAvatar').src;
  let list = JSON.parse(localStorage.getItem('friends') || '[]');
  list.push({ name, id, avatar });
  localStorage.setItem('friends', JSON.stringify(list));
  alert('已添加到联系人');
});

// 保存设置
document.getElementById('saveSettings').addEventListener('click', () => {
  const name = document.getElementById('changeName').value;
  if (name) {
    document.getElementById('username').innerText = name;
    document.getElementById('pName').innerText = name;
    localStorage.setItem('name', name);
  }
  alert('保存成功');
});

// 恢复用户数据
window.addEventListener('load', () => {
  const name = localStorage.getItem('name');
  if (name) {
    document.getElementById('username').innerText = name;
    document.getElementById('pName').innerText = name;
  }
});
