function openApp(appName) {
  // 跳转到相应的应用
  if (appName === 'wechat') {
    window.location.href = 'app/wechat/index.html'; // WeChat 应用
  } else if (appName === 'settings') {
    window.location.href = 'app/settings/index.html'; // 设置 应用
  } else if (appName === 'netyellow') {
    window.location.href = 'app/netyellow/index.html'; // 网黄 应用
  } else if (appName === 'taobao') {
    window.location.href = 'app/taobao/index.html'; // 桃宝 应用
  } else if (appName === 'tik') {
    window.location.href = 'app/tik/index.html'; // Tik 应用
  } else if (appName === 'music') {
    window.location.href = 'app/music/index.html'; // 音乐 应用
  } else if (appName === 'bankcard') {
    window.location.href = 'app/bankcard/index.html'; // 银行卡 应用
  } else if (appName === 'choutuan') {
    window.location.href = 'app/choutuan/index.html'; // 丑团 应用
  } else if (appName === 'memo') {
    window.location.href = 'app/memo/index.html'; // 备忘录 应用
  } else if (appName === 'weibo') {
    window.location.href = 'app/weibo/index.html'; // 围脖 应用
  } else if (appName === 'weather') {
    window.location.href = 'app/weather/index.html'; // 天气 应用
  } else if (appName === 'inventory') {
    window.location.href = 'app/inventory/index.html'; // 库存 应用
  }
}

let isLocked = true;  // 默认是锁定状态
let enteredPassword = "";  // 存储用户输入的密码

// 设置正确密码
const correctPassword = "050608";

// 获取页面元素
const lockScreen = document.getElementById("lockScreen");
const homeScreen = document.getElementById("homeScreen");
const lockInput = document.getElementById("lockInput");
const dots = document.getElementById("dots");

// 监听密码按键
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", () => {
    if (key.textContent === "⌫") {
      // 删除最后一个输入的字符
      enteredPassword = enteredPassword.slice(0, -1);
    } else {
      // 添加数字到输入密码
      enteredPassword += key.textContent;
    }

    // 更新显示的点
    dots.innerHTML = "";
    for (let i = 0; i < enteredPassword.length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dots.appendChild(dot);
    }

    // 如果密码正确，则解锁
    if (enteredPassword.length === 6 && enteredPassword === correctPassword) {
      setTimeout(() => {
        unlockPhone();
      }, 500);  // 解锁延迟
    }
  });
});

// 解锁手机
function unlockPhone() {
  isLocked = false;
  lockScreen.style.display = "none";  // 隐藏锁屏
  homeScreen.style.display = "flex";  // 显示主屏幕
}
