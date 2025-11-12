// 消息发送函数
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value;
  if (messageText.trim() === "") return;

  // 发送消息（这里假设通过一个聊天框显示消息）
  const chatList = document.querySelector(".chat-list");
  const newMessage = document.createElement("div");
  newMessage.classList.add("chat-item");
  newMessage.innerHTML = `
    <img src="avatar.jpg" alt="头像" class="avatar">
    <div class="chat-info">
      <div class="chat-header">
        <span class="contact-name">自己</span>
        <span class="message-time">${new Date().toLocaleTimeString()}</span>
      </div>
      <div class="last-message">
        <span class="message-text">${messageText}</span>
      </div>
    </div>
  `;
  chatList.appendChild(newMessage);

  // 清空输入框
  messageInput.value = "";
}
