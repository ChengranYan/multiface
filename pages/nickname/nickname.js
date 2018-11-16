// pages/nickname/nickname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    nickname: ''
  },
  handleInputChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      nickname: e.detail.value
    })
  },
  handleNickName: function () {
    let self = this;
    console.log('sdfsf')
    // wx.navigateTo({
    //   url: '/pages/content/content'
    // })
    wx.request({
      url: 'https://api.aiou.xyz/test/create_sneak',
      data: {
        code: app.globalData.code,
        username_sneak: self.data.nickname
      },
      method: 'POST',
      success(res) {
        console.log(res.data.status)
        if (res.data.status === 'success') {
          wx.navigateTo({
            url: '/pages/content/content'
          })
        }
        console.log('注册接口', res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})