import {search_user} from './utils/md.js'
import {formatTime} from './utils/util.js'

//app.js
App({
  onLaunch: function () {

    require('./utils/sdk-v1.1.1.js')

    let clientID = '32628f5c8e645161b5c5'

    wx.BaaS.init(clientID)
    //判断用户是否刚刚登陆过
    let uid = this.getUserID()

    if(!uid) {
      // 获取用户信息
      wx.BaaS.login().then((res) => {
      // 用户允许授权，res 包含用户完整信息，详见下方描述
        this.globalData.userInfo = res

        search_user(res)
      }, (res) => {
         // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
         // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.authorize`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize.html) 要求用户提供授权
      })

    } else {

      let userInfo = this.getUserInfo()

      this.globalData.userInfo = userInfo

      search_user(userInfo)
    }

    

  },

  getUserID(){

    if(this.uid) {
      return this.uid
    }

    let uid = wx.BaaS.storage.get('uid')
    this.uid = uid

    return uid
  },

  getUserInfo(){
    if(this.userInfo) {
      return this.userInfo
    }

    let userInfo = wx.BaaS.storage.get('userinfo')
    this.userInfo = userInfo

    return userInfo
  },

  globalData: {
    userInfo: null
  }
})
