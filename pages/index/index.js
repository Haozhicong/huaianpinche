import request from '../../utils/network.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/imgs/b1.jpg',
      '/imgs/b2.jpg',
    ],
    testdata: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 0, // 默认第一张
    isOn: 1,
    // 页数
    pages: 1,
    // limit
    limit: 10,
    // 总页数
    totalPage: 0,
    list_info: [],
    loadmores: false,
    moreJiazai: true,
    nullData: false
  },
  /**
   * 事件处理函数
   */
  // 免责声明
  mzsm() {
    wx.navigateTo({
      url: '../disclaimer/disclaimer',
    })
  },
  /**
   * 轮播图的切换事件
   */
  swiperChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  /**
   * 轮播图切换事件
   */
  swiperClick() {
    console.log(this.data.current)
  },
  // 跳转到发布页面
  goFindPerson() {
    wx.navigateTo({
      url: '../findPerson/findPerson',
    })
  },
  goSelect() {
    wx.navigateTo({
      url: '../serchInfo/serchInfo',
    })
  },
  // 拨打电话功能
  telPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.detail.phone,
      success() {
        console.log("成功的回调！")
      },
      fail() {
        console.log("失败的回调！")
      },
      complete() {
        console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
      }
    })
    // e.detail // 自定义组件触发事件时提供的detail对象
  },
  getUserInfo(e) {
    wx.setStorageSync("userinfo", e.detail.userInfo)
    wx.navigateTo({
      url: "../userCenter/userCenter",
    })
  },
  _all_list(pageNumber, override) {
    this.setData({
      loadmores: true,
      moreJiazai: false
    })
    this.loading = true
    request({
      url: "api/homeList",
      method: 'post',
      data: {
        page: pageNumber,
        limit: this.data.limit
      }
    }).then(res => {
      if (res.data.code === 200) {
        let newList = res.data.data
        const finList = this.data.list_info.concat(newList)
        this.setData({
          page: pageNumber,
          list_info: override ? newList : finList,
          totalPage: res.data.totalPage,
        })
        if (pageNumber >= res.data.totalPage) {
          this.setData({
            nullData: true,
            loadmores: false
          })
        }
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
    }).then(() => {
      this.loading = false
    })
  },
  _search_list(data) {
    request({
      url: 'api/iconSearch',
      method: 'post',
      data: data
    }).then(res => {
      if (res.data.code === 200) {
        this.setData({
          list_info: res.data.data
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
    // this._all_list(1, true)
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
    this._all_list(1, true)
    let pageses = getCurrentPages();
    let currPage = pageses[pageses.length - 1];
    if (currPage.data.testdata) {
      this._search_list(currPage.data.testdata)
    }
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
    this.data.testdata = "";
    if (!this.loading) {
      this._all_list(1, true)
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.testdata) {
      console.log("有数据！")
      this.setData({
        loadmores: false,
        nullData: true
      })
    } else {
      // 检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
      if (!this.loading && this.data.page <= this.data.totalPage) {
        this._all_list(this.data.page + 1)
      } else {
        this.setData({
          loadmores: false,
          nullData: true
        })
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})