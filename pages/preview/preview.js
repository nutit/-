import {add_letter, add_received} from '../../utils/md.js'
const app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad: function (option) {
    this.setData({
      "sendname": option.sendname,
      "addressee": option.addressee,
      "content": option.content,
      "fonts": option.content.length,
      "time": option.time,
      "send_id": option.send_id,
      "send_avatar": option.send_avatar
    })
    
    if (this.data.send_id) {
      add_received(this.data)
    }


  },
  edit: function() {
    wx.navigateTo({
      url: '../../pages/edit/edit'
    })
  },
  onShareAppMessage: function() {
    let data = {
      "user_id":  app.globalData.userInfo.id,
      "user_name": app.globalData.userInfo.nickName,
      "content": this.data.content,
      "receuved_name": this.data.addressee,
      "time": this.data.time
    }

    return {
      title: this.data.sendname + "给您的一封信",
      path: '/pages/preview/preview?sendname='+this.data.sendname+'&content='+this.data.content+'&addressee='+this.data.addressee+'&time='+this.data.time+'&send_id='+app.globalData.userInfo.id+'&send_avatar='+app.globalData.userInfo.avatarUrl,
      success: function(res) {
        add_letter(data)
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  back: function() {
    wx.navigateBack()
  }
})
