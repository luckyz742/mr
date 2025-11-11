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

let password = "";
function addPassword(num) {
  password += num;
  if (password.length === 4) {
    if (password === "1234") { // 假设密码是 1234
      document.getElementById("lockScreen").style.display = "none"; // 锁屏消失
      document.getElementById("homeScreen").style.display = "block"; // 主屏幕显示
      document.getElementById("homeText").style.display = "none"; // "主屏幕已解锁"文本消失
    } else {
      password = ""; // 错误密码，清空
      alert("密码错误");
    }
  }
}

function deletePassword() {
  password = password.slice(0, -1); // 删除密码的最后一位
}
let password = "1234";  // 设置密码
let inputPassword = "";  // 当前输入的密码
let lockScreen = document.getElementById("lockScreen");
let homeScreen = document.getElementById("homeScreen");
let dots = document.getElementById("dots");
let lockTip = document.querySelector(".lock-tip");

// 处理按键输入
function addDigit(digit) {
  inputPassword += digit;
  updateDots();
  
  // 如果密码输入正确，跳转到主屏幕
  if (inputPassword.length === password.length) {
    if (inputPassword === password) {
      unlockPhone();
    } else {
      inputPassword = "";  // 重置输入
      updateDots();
      lockTip.textContent = "密码错误，请重试";
      setTimeout(() => {
        lockTip.textContent = "输入密码解锁";
      }, 1500);
    }
  }
}

// 删除输入的最后一位
function deleteDigit() {
  inputPassword = inputPassword.slice(0, -1);
  updateDots();
}

// 更新密码框的点
function updateDots() {
  dots.innerHTML = "";
  for (let i = 0; i < inputPassword.length; i++) {
    dots.innerHTML += "●";
  }
  for (let i = inputPassword.length; i < password.length; i++) {
    dots.innerHTML += "○";
  }
}

// 解锁手机
function unlockPhone() {
  lockScreen.style.display = "none";
  homeScreen.style.display = "block";
}
