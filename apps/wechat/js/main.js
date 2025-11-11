const chatBox = document.getElementById('chatBox');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const moreBtn = document.getElementById('moreBtn');
const moreMenu = document.getElementById('moreMenu');

let lastSpeaker = null;

// 切换更多菜单
moreBtn.addEventListener('click', () => {
  moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
});

// 发送按钮
sendBtn.addEventListener('click', () => {
  const text = msgInput.value.trim();
  if (text) {
    sendMessage(text);
    msgInput.value = '';
  }
});

function sendMessage(content) {
  addMessage('me', content);

  const thinkBubble = addThinkingBubble();

  setTimeout(() => {
    removeThinkingBubble(thinkBubble);
    const replies = generateAIReplies(content);
    replies.forEach((txt, i) => {
      setTimeout(() => addMessage('ai', txt), i * 1300);
    });
  }, 1000 + Math.random() * 1000);
}

function addMessage(role, text) {
  let group = chatBox.querySelector(`.message-group.${role}:last-child`);
  if (!group || lastSpeaker !== role) {
    group = document.createElement('div');
    group.className = `message-group ${role}`;
    group.innerHTML = `
      <img src="../assets/${role}-avatar.png" class="avatar">
      <div class="bubbles"></div>
    `;
    chatBox.appendChild(group);
  }

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  group.querySelector('.bubbles').appendChild(bubble);
  lastSpeaker = role;
  scrollToBottom();
}

function addThinkingBubble() {
  const group = document.createElement('div');
  group.className = 'message-group ai';
  group.innerHTML = `
    <img src="../assets/ai-avatar.png" class="avatar">
    <div class="bubbles">
      <div class="bubble thinking">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  `;
  chatBox.appendChild(group);
  scrollToBottom();
  return group;
}

function removeThinkingBubble(group) {
  if (group && group.parentNode) group.remove();
}

function generateAIReplies(content) {
  const base = [
    "哈哈，这个我懂 😆",
    "你说得挺有趣的。",
    "这让我想起了别的事情～",
    "是啊，有点意思。",
    "😂",
    "👍",
  ];
  const count = Math.floor(Math.random() * 2) + 1;
  return base.sort(() => 0.5 - Math.random()).slice(0, count);
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
