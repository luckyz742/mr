const lock = document.getElementById("lockScreen");
const home = document.getElementById("homeScreen");
const passwordBox = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const pwdInput = document.getElementById("pwdInput");
const appContainer = document.getElementById("appContainer");
const backHome = document.getElementById("backHome");
const appFrame = document.getElementById("appFrame");

const PASSWORD = "1234"; // 解锁密码

function updateTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  document.getElementById("time").textContent = `${h}:${m}`;
  document.getElementById("date").textContent = `${days[now.getDay()]}, ${now.getMonth()+1}月${now.getDate()}日`;
}
updateTime();
setInterval(updateTime, 1000);

// 滑动解锁 → 显示密码输入
lock.addEventListener("click", () => {
  document.querySelector(".unlock").style.display = "none";
  passwordBox.style.display = "block";
});

// 输入密码解锁
unlockBtn.addEventListener("click", () => {
  if (pwdInput.value === PASSWORD) {
    lock.style.display = "none";
    home.style.display = "flex";
  } else {
    alert("密码错误！");
  }
});

// 点击 App 打开 iframe
document.querySelectorAll(".app-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const appName = icon.dataset.app;
    appFrame.src = `apps/${appName}/index.html`;
    home.style.display = "none";
    appContainer.style.display = "flex";
  });
});

// 返回桌面
backHome.addEventListener("click", () => {
  appContainer.style.display = "none";
  home.style.display = "flex";
});
