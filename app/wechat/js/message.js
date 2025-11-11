// 控制消息的发送
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (message) {
    const chatList = document.querySelector('.chat-list');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-item');
    messageElement.innerHTML = `<span>${message}</span>`; // 简单的消息内容显示
    chatList.appendChild(messageElement);
    messageInput.value = '';  // 清空输入框
  }
}

// 控制显示/隐藏附件选项
function toggleOptions() {
  const optionsMenu = document.getElementById('optionsMenu');
  optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// 点击菜单外部区域时关闭菜单
document.addEventListener('click', function(event) {
  const optionsMenu = document.getElementById('optionsMenu');
  const plusButton = document.querySelector('.plus-button');
  
  if (!optionsMenu.contains(event.target) && event.target !== plusButton) {
    optionsMenu.style.display = 'none';
  }
});
