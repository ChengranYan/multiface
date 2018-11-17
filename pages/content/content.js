// pages/content/content.js
const app = getApp()
Page({
  data: {
    modeLeft: 10,
    modeRight: 10,
    modeType: app.globalData.modeType, //此时为实名模式
    data: [],
    windowWidth: wx.getSystemInfoSync().windowWidth
  },
  handlePostMsg: function() {
    wx.navigateTo({
      url: '/pages/post/post'
    })
  },
  SwitchingAnonymousModeMove: function (e) {
    const { clientX } = e.changedTouches[0];
    if (clientX <= 360 && this.data.modeType) {
      this.setData({
        modeLeft: clientX + 96,
       })
    } else {
      this.setData({
        modeType: false,
        modeLeft: 10,
      })
      app.globalData.modeType = false
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
    const {clientX} = e.changedTouches[0];
    const {modeType, windowWidth} = this.data;
    if (clientX >= 20 && !modeType) {
      this.setData({
        modeRight: windowWidth - clientX + 96,
      })
    } else {
      this.setData({
        modeType: true,
        modeRight: 10
      })
      app.globalData.modeType = true
    }
  },
  SwitchingRealNameModeEnd: function () {
    if (!this.data.modeType) {
      this.setData({
        modeRight: 10
      })
    }
  },
  handleComment: function() {
    wx.navigateTo({
      url: '/pages/discuss/discuss'
    })
  },
  parseTime(tiem) {
    return new Date(tiem).toLocaleDateString()
  },
  getAvatar() {
    let i = Math.floor(Math.random() * 10);
    return `http://api.aiou.xyz/pictures/${i}.jpg`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchPages()
    console.log(this.parseTime("2018-11-12T08:53:36.349097"))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  fetchPages: function() {
    let self = this;
    wx.request({
      url: 'https://api.aiou.xyz/prest4mface/_QUERIES/mface/getallcard?page_size=5&page=1',
      method: 'GET',
      success(res) {
        // wx.navigateTo({
        //   url: '/pages/nickname/nickname'
        // })
        let data = res.data.map((item) => {
          item.create_time = self.parseTime(item.create_time)
          item.avatar = self.getAvatar()
        })
        console.log('首页接口', res.data)
        self.setData({
          data: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      modeType: app.globalData.modeType
    })
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