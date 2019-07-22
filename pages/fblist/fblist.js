import request from '../../utils/network.js'
const userid = wx.getStorageSync("userid");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myfb_info: []
  },
  // 发送请求记录
  _getMyList() {
    request({
      url: 'api/iconGetList',
      method: 'post',
      data: {
        userid: userid
      }
    }).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          myfb_info: res.data.data
        })
      }
      if (res.data.code === 500) {
        wx.showToast({
          title: "未知异常，请联系管理员！",
          icon: 'none',
          duration: 3000
        })
      }

    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyList()
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