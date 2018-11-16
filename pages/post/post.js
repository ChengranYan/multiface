// pages/content/content.js
const app = getApp()
Page({
  data: {
    postMsg: '',
    imgCount: 0,
    modeLeft: 10,
    modeRight: 10,
    postImgPath: ['plus'],
    modeType: true, //此时为实名模式
    data: [1, 2, 3, 4, 5, 6],
    windowWidth: wx.getSystemInfoSync().windowWidth
  },
  handlePostImage: function() {
    let self = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths;
        // self.data.postImgPath.push[tempFilePaths[0]];
        if (self.data.postImgPath.length + tempFilePaths.length >= 10) {
          self.setData({
            postImgPath: self.filterPath(self.data.postImgPath)
          })
        }
        self.setData({
          postImgPath: [...tempFilePaths, ...self.data.postImgPath]
        })
        app.globalData.postImgPath = tempFilePaths
      }
    })
  },
  filterPath: function(arr) {
    return arr.filter((item) => {
      return !item.includes('plus')
    })
  },
  handlePostMsg: function() {
    let self = this;
    // console.log(self.data.postImgPath[0])
    let paths = self.filterPath(self.data.postImgPath)
    // self.img2base64(self.data.postImgPath[0])
    console.log(paths)
    let promises = paths.map(path => self.img2base64(path))
    Promise.all(promises).then((data) => {
      wx.request({
        url: 'https://api.aiou.xyz/prest4mface/mface/public/t_card',
        method: 'POST',
        data: {
          mail: 'sunyong@guanghe.tv',  //用户邮箱
          status: true,  //用户状态，true为正常状态，false为隐身（猥琐）状态
          content: 'hahaha',  //帖子内容
          picture: data  //帖子配图，为数组类型，每个元素为图片的base64字符串
        },
        success: res => { 
          console.log(res.data)
          wx.navigateTo({
            url: '/pages/content/content'
          })
        }
      })
    })
  },
  img2base64(path) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function ({ data }) {
          resolve('data:image/jpeg;base64,' + data)
        }
      })
    })
  },
  handlePostChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      postMsg: e.detail.value
    })
  },
  // handlePostMsg: function () {
  //   wx.chooseImage({
  //     count: 9,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       console.log(res)

  //       const tempFilePaths = res.tempFilePaths
  //       app.globalData.postImgPath = tempFilePaths
  //       console.log(app.globalData.postImgPath)
  //     }
  //   })
  // },
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
    const { clientX } = e.changedTouches[0];
    const { modeType, windowWidth } = this.data;
    if (clientX >= 20 && !modeType) {
      this.setData({
        modeRight: windowWidth - clientX + 96,
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
  handleComment: function () {
    wx.navigateTo({
      url: '/pages/discuss/discuss'
    })
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