// pages/serchInfo/serchInfo.js
const time = require("../../utils/util.js")
import WxValidate from '../../utils/WxValidate.js'


Page({
  data: {
    date: time.formatDate(new Date()),
    time: time.formatTimeNew(new Date()),
    isAgree: false,
    isDisabled: true,
    showTopTips: false,
  },
  onLoad() {
    this.initValidate()
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  // loading
  showTopTips: function () {
    // loading
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  // 时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 日期
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 是否同意
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      isDisabled: !this.data.isDisabled
    });
  },
  //验证函数
  initValidate() {
    const rules = {
      startAdd: {
        required: true
      },
      endAdd: {
        required: true
      },
      numberP: {
        required: true
      },
      satrTime: {
        required: true
      },
      satrDate: {
        required: true
      }
    }
    const messages = {
      startAdd: {
        required: '请填写出发地',
      },
      endAdd: {
        required: '请填写目的地',
      },
      numberP: {
        required: '请填写空位人数',
      },
      satrTime: {
        required: '请填写出发时间',
      },
      satrDate: {
        required: '请填写出发日期',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      // 返回页面携带参数
      const pageses = getCurrentPages()
      const prevPage = pageses[pageses.length - 2] // 上一页
      prevPage.setData({
        testdata: params
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
});