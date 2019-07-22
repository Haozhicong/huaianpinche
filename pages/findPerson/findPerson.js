const time = require("../../utils/util.js")
import WxValidate from '../../utils/WxValidate.js'
import request from "../../utils/network.js"
const userid = wx.getStorageSync("userid")
console.log(userid)
Page({
  data: {
    date: time.formatDate(new Date()),
    time: time.formatTimeNew(new Date()),
    showTopTips: false,
    countries: ["男", "女"],
    countryIndex: 0,
    isAgree: false,
    isDisabled: true
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
  onLoad() {
    this.initValidate()//验证规则函数
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        tel: true
      },
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
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
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
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    let params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      wx.showLoading({
        title: '发送中...',
        mask: true
      })
      params.userid = userid
      request({
        url: 'api/iconFb',
        method: "post",
        data: params
      }).then(res => {
        if (res.data.code == 200) {
          wx.hideLoading()
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '服务器异常，请联系管理员！',
            icon: 'none',
            duration: 2000
          });
        }
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '服务器异常，请联系管理员！',
          icon: 'none',
          duration: 2000
        });
      })
    }

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
  // 性别选择
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    })
  },
  // 是否同意条约
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      isDisabled: !this.data.isDisabled
    });
  },

});