// 页面跳转
function goToPage(page) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(page).style.display = 'block';
}

// 返回按钮
function goBack() {
  window.history.back();
}

// 发送消息
function sendMessage() {
  let message = document.getElementById('messageInput').value;
  if (message.trim() !== '') {
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.innerHTML = `<div class="message-content">${message}</div>`;
    document.querySelector('.chat-list').appendChild(messageContainer);
    document.getElementById('messageInput').value = '';
  }
}

// 显示和隐藏选项菜单
function toggleOptions() {
  let optionsMenu = document.getElementById('optionsMenu');
  optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// 添加联系人
function addContact() {
  alert('添加联系人');
}

// 添加群聊
function addGroup() {
  alert('添加群聊');
}

// 摇一摇
function shake() {
  alert('摇一摇');
}
