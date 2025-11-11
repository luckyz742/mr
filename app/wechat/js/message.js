// 页面切换、显示/隐藏选项菜单等
document.addEventListener('DOMContentLoaded', function() {
  // 控制菜单显示/隐藏
  const plusButton = document.querySelector('.plus-button');
  const optionsMenu = document.getElementById('optionsMenu');
  plusButton.addEventListener('click', function() {
    optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
  });

  // 点击外部区域关闭菜单
  document.addEventListener('click', function(event) {
    if (!optionsMenu.contains(event.target) && event.target !== plusButton) {
      optionsMenu.style.display = 'none';
    }
  });
});

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
        <div class="last-message">${message}</div>
      </div>
    `;
    chatList.appendChild(messageContainer);
    messageInput.value = '';  // 清空输入框
  }
}

// 显示弹出菜单的功能
function toggleOptions() {
  const optionsMenu = document.getElementById('optionsMenu');
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

// 发送红包
function sendRedPacket() {
  alert('发送红包');
  // 实现红包功能，例如跳转到红包页面或者弹出红包界面
}

// 发送转账
function sendTransfer() {
  alert('发送转账');
  // 实现转账功能
}

// 发送礼物
function sendGift() {
  alert('送礼物');
  // 实现送礼物功能
}

// 发送语音
function sendVoice() {
  alert('发送语音');
  // 实现语音功能
}

// 进行视频通话
function sendVideo() {
  alert('视频通话');
  // 实现视频通话功能
}

// 发送位置
function sendLocation() {
  alert('发送位置');
  // 实现位置功能
}

// 共享音乐
function shareMusic() {
  alert('共享音乐');
  // 实现共享音乐功能
}

// 点击外部区域时关闭菜单
document.addEventListener('click', function(event) {
  const optionsMenu = document.getElementById('optionsMenu');
  const plusButton = document.querySelector('.plus-button');
  
  if (!optionsMenu.contains(event.target) && event.target !== plusButton) {
    optionsMenu.style.display = 'none';
  }
});
