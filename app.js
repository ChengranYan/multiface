//app.js
App({
  onLaunch: function () {
    let self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        self.globalData.code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.aiou.xyz/test/is_register',
          data: {
            code: res.code
          },
          method: 'GET',
          success(res) {
            if (res.data.status === 'success') {
              console.log('是否注册', res.data)
              self.globalData.info = res.data
              wx.navigateTo({
                url: '/pages/content/content'
              })
            }
          }
        })
      }
    })

    

    wx.getUserInfo({
      success: res => {
        console.log('info')
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
    console.log('getSetting')
    //获取用户信息
  },
  globalData: {
    userInfo: null,
    info: null,
    title: '',
    code: '',
    mail: '',
    modeType: true,
    postImgPath: []
  }
})