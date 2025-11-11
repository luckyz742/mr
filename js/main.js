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
      document.getElementById("lockScreen").style.display = "none";
      document.getElementById("homeScreen").style.display = "block";
    } else {
      password = ""; // 错误密码，清空
      alert("密码错误");
    }
  }
}

function deletePassword() {
  password = password.slice(0, -1); // 删除密码的最后一位
}
