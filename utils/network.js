import config from "./config.js"
export default function requset(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.baseUrl + options.url,
      timeout: config.timeout,
      data: options.data,
      method: options.method || "get",
      success: resolve,
      fail: reject
    })
  })
}