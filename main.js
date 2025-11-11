const lockScreen = document.getElementById("lock");
const homeScreen = document.getElementById("home");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const appContainer = document.getElementById("appContainer");
const appFrame = document.getElementById("appFrame");
const backHome = document.getElementById("backHome");

// 更新时间
function updateTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const weekdays = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  timeEl.textContent = `${h}:${m}`;
  dateEl.textContent = `${weekdays[now.getDay()]}, ${now.getMonth()+1}月${now.getDate()}日`;
}
setInterval(updateTime, 1000);
updateTime();

// 解锁
lockScreen.addEventListener("click", () => {
  lockScreen.classList.add("hidden");
  setTimeout(() => homeScreen.classList.add("active"), 300);
});

// 打开 App
document.querySelectorAll(".app-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const app = icon.dataset.app;
    appFrame.src = `apps/${app}/index.html`;
    homeScreen.classList.remove("active");
    appContainer.style.display = "flex";
  });
});

// 返回桌面
backHome.addEventListener("click", () => {
  appFrame.src = "";
  appContainer.style.display = "none";
  homeScreen.classList.add("active");
});