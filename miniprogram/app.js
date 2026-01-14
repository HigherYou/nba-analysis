App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env: 'your-env-id', // 填入你的云开发环境ID
        traceUser: true,
      })
    }

    this.globalData = {
      theme: 'dark',
      season: '2024-25',
      deviceInfo: wx.getSystemInfoSync()
    }
  }
})
