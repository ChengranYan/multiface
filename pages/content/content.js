// pages/content/content.js
Page({
  data: {
    modeLeft: 10,
    modeRight: 10,
    modeType: true, //此时为实名模式
    data: [1, 2, 3, 4, 5, 6],
    windowWidth: wx.getSystemInfoSync().windowWidth
  },
  SwitchingAnonymousModeMove: function (e) {
    const clientX = e.changedTouches[0].clientX;
    if (clientX <= 360 && this.data.modeType) {
      this.setData({
        modeLeft: clientX + 96,
       })
    } else {
      this.setData({
        modeType: false,
        modeLeft: 10,
      })
    }
  },
  SwitchingAnonymousModeEnd: function () {
    if (this.data.modeType) {
      this.setData({
        modeLeft: 10
      })
    }
  },
  SwitchingRealNameModeMove: function (e) {
    const clientX = e.changedTouches[0].clientX;
    if (clientX >= 20 && !this.data.modeType) {
      this.setData({
        modeRight: this.data.windowWidth - clientX + 96,
      })
    } else {
      this.setData({
        modeType: true,
        modeRight: 10
      })
    }
  },
  SwitchingRealNameModeEnd: function () {
    if (!this.data.modeType) {
      this.setData({
        modeRight: 10
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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