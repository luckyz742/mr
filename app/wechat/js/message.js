// 返回按钮的功能
function goBack() {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('homeScreen').style.display = 'block';  // 返回到主界面
}

// 控制显示/隐藏右上角选项菜单
function toggleOptions() {
  const optionsMenu = document.getElementById('optionsMenu');
  optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// 控制显示/隐藏左侧 - 按钮的菜单
function togglePlusOptions() {
  const optionsMenu = document.getElementById('optionsMenu');
  optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// 发送消息
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (message) {
    const chatList = document.querySelector('.chat-list');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-item');
    messageContainer.innerHTML = `
      <img src="头像链接" class="avatar" alt="头像">
      <div class="chat-info">
        <div class="chat-header">
          <span class="contact-name">我</span>
        </div>
        <div class="last-message">
          <span class="message-text">${message}</span>
          <span class="message-time">刚刚</span>
        </div>
      </div>
    `;
    chatList.appendChild(messageContainer);
    messageInput.value = '';  // 清空输入框
  }
}

// 发送表情包
function sendEmoji() {
  alert('发送表情包');
}

// 发送图片
function sendImage() {
  alert('发送图片');
}

// 发送红包
function sendRedPacket() {
  alert('发送红包');
}

// 发送转账
function sendTransfer() {
  alert('发送转账');
}

// 发送语音
function sendVoice() {
  alert('发送语音');
}

// 发起语音通话
function sendVoiceCall() {
  alert('语音通话');
}

// 送礼物
function sendGift() {
  alert('送礼物');
}

// 一起听
function shareMusic() {
  alert('一起听');
}

// 点击外部区域时关闭菜单
document.addEventListener('click', function(event) {
  const optionsMenu = document.getElementById('optionsMenu');
  const plusButton = document.querySelector('.plus-button');
  
  if (!optionsMenu.contains(event.target) && event.target !== plusButton) {
    optionsMenu.style.display = 'none';
  }
});
