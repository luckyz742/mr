function openApp(appName) {
  // 跳转到相应的应用
  if (appName === 'wechat') {
    window.location.href = 'wechat/index.html'; // WeChat 应用
  } else if (appName === 'settings') {
    window.location.href = 'settings/index.html'; // 设置 应用
  } else if (appName === 'netyellow') {
    window.location.href = 'netyellow/index.html'; // 网黄 应用
  } else if (appName === 'taobao') {
    window.location.href = 'taobao/index.html'; // 桃宝 应用
  } else if (appName === 'tik') {
    window.location.href = 'tik/index.html'; // Tik 应用
  } else if (appName === 'music') {
    window.location.href = 'music/index.html'; // 音乐 应用
  } else if (appName === 'bankcard') {
    window.location.href = 'bankcard/index.html'; // 银行卡 应用
  } else if (appName === 'choutuan') {
    window.location.href = 'choutuan/index.html'; // 丑团 应用
  } else if (appName === 'memo') {
    window.location.href = 'memo/index.html'; // 备忘录 应用
  } else if (appName === 'weibo') {
    window.location.href = 'weibo/index.html'; // 围脖 应用
  } else if (appName === 'weather') {
    window.location.href = 'weather/index.html'; // 天气 应用
  } else if (appName === 'inventory') {
    window.location.href = 'inventory/index.html'; // 库存 应用
  }
}
