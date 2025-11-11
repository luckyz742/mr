const lockScreen = document.getElementById('lockScreen');
const homeScreen = document.getElementById('homeScreen');
const dotsContainer = document.getElementById('dots');
const keys = document.querySelectorAll('.key');
const timeEl = document.getElementById('lockTime');
const dateEl = document.getElementById('lockDate');

let input = '';
const PASSWORD = '123456';

// 更新时间
function updateTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  const dateStr = `${days[now.getDay()]}, ${now.getMonth()+1}月${now.getDate()}日`;
  timeEl.textContent = `${h}:${m}`;
  dateEl.textContent = dateStr;
}
setInterval(updateTime, 1000);
updateTime();

// 点击数字
keys.forEach(key => {
  key.addEventListener('click', () => {
    const val = key.textContent.trim();
    if (key.classList.contains('empty')) return;
    if (key.classList.contains('delete')) {
  input = input.slice(0, -1);
} else if (key.textContent.trim() && input.length < 6) {
  input += key.textContent.trim();
}
updateDots();

if (input.length === 6) {
  setTimeout(() => {
    if (input === PASSWORD) unlock();
    else errorShake();
  }, 200);
}
  });
});

// 更新圆点显示
function updateDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < input.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
  }
}

// 密码正确 → 解锁
function unlock() {
  lockScreen.style.opacity = '0';
  setTimeout(() => {
    lockScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
  }, 600);
}

// 密码错误 → 抖动并清空
function errorShake() {
  dotsContainer.classList.add('shake');
  setTimeout(() => {
    dotsContainer.classList.remove('shake');
    input = '';
    updateDots();
  }, 500);
}

// 抖动动画样式
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-8px); }
  40%,80% { transform: translateX(8px); }
}
.shake { animation: shake 0.4s; }
`;
document.head.appendChild(style);
