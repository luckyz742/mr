// WeChat 代码实现

// 页面切换
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const targetPage = tab.getAttribute('data-target');
    document.querySelectorAll('.page').forEach(page => {
      if (page.id === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
  });
});

// 发送消息
document.getElementById('sendMessage').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (message) {
    const chatContent = document.getElementById('chatContent');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'my-message');
    messageDiv.textContent = message;
    chatContent.appendChild(messageDiv);
    messageInput.value = '';
    
    // 自动滚动到底部
    chatContent.scrollTop = chatContent.scrollHeight;
  }
});

// 更换头像
document.querySelector('.changeAvatarBtn').addEventListener('click', () => {
  const newAvatar = prompt("请输入新头像的URL：");
  if (newAvatar) {
    document.getElementById('profileAvatar').src = newAvatar;
  }
});

// 添加联系人
document.querySelector('.addContactBtn').addEventListener('click', () => {
  const contactName = prompt("请输入联系人姓名：");
  if (contactName) {
    const contactList = document.getElementById('contactsList');
    const contactItem = document.createElement('li');
    contactItem.textContent = contactName;
    contactList.appendChild(contactItem);
  }
});

// 朋友圈动态加载
const momentsContent = document.getElementById('momentsContent');
momentsContent.innerHTML = `
  <div class="moment">
    <p>我今天过得很开心！</p>
    <button>点赞</button>
  </div>
  <div class="moment">
    <p>这真是一个美丽的日子</p>
    <button>点赞</button>
  </div>
`;
