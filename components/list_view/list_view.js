// components/list_view/list_view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    viewList: {
      type: Array,
      value: []
    },
    ishow:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打电话功能
    onTap: function (e) {
      var myEventDetail = {
        phone: e.target.dataset.phone
      }
      this.triggerEvent('myevent', myEventDetail)
    }

  },
  onLoad: function (options) {

  }
})
