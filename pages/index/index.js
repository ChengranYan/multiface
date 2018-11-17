//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code: '',
    isGettingCode: false,
    userInfo: {},
    hasUserInfo: false,
    timeout: 60,
    timer: null,
    mail: '',
    mailCode: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleMailChange: function(e) {
    this.setData({
      mail: e.detail.value
    })
  },
  handleInputChange: function(e) {
    this.setData({
      mailCode: e.detail.value
    })
  },
  handleRegister: function() {
    let self = this;
    console.log(self.data.code, self.data.mail, self.data.mailCode)
    wx.login({
      success(res) {
        if (res.code) {
          self.setData({
            code: res.code
          })
          console.log('login code ', res.code)
          //发起网络请求
          wx.request({
            url: 'https://api.aiou.xyz/test/register',
            data: {
              code: res.code,
              mail: self.data.mail,
              mail_code: self.data.mailCode
            },
            method: 'POST',
            success(res) {
              wx.navigateTo({
                url: '/pages/nickname/nickname'
              })
              console.log('注册接口', res.data)
            }
          })
          // wx.request({
          //   url: 'https://api.aiou.xyz/test/send_mail',
          //   data: {
          //     code: res.code,
          //     mail: 'chengran@guanghe.tv'
          //   },
          //   method: 'POST',
          //   success(res) {
          //     console.log('注册接口', res.data)
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // wx.request({
    //   url: 'https://api.aiou.xyz/test/register',
    //   data: {
    //     code: self.data.code,
    //     mail: self.data.mail,
    //     mail_code: self.data.mailCode
    //   },
    //   method: 'POST',
    //   success(res) {
    //     console.log('注册接口', res.data)
    //   }
    // })
  },
  handleGetMailCode: function(){
    let self = this; 
    this.setData({
      isGettingCode: true
    })
    self.timer = setInterval(() => {
      self.setData({
        timeout: self.data.timeout - 1
      })
      if (self.data.timeout === 0) {
        clearInterval(self.timer)
        self.setData({
          isGettingCode: false
        })
      }
    }, 1000)
    wx.login({
      success(res) {
        if (res.code) {
          self.setData({
            code: res.code
          })
          console.log('login code ', res.code)
          //发起网络请求
          wx.request({
            url: 'https://api.aiou.xyz/test/send_mail',
            data: {
              code: res.code,
              mail: self.data.mail
            },
            method: 'POST',
            success(res) {
              wx.showToast({
                title: '验证码已发送邮箱',
                icon: 'none',
                duration: 3000
              })
              app.globalData.mail = self.data.mail
              console.log('注册接口',res.data)
              console.log(app.globalData)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad: function () {
    let self = this;
    wx.login({
      success(res) {
        if (res.code) {
          self.setData({
            code: res.code
          })
          console.log('login code ', res.code)
          //发起网络请求
        }
      }
    })
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
