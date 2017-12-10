import {formatTime} from '../../utils/util.js'
import {letterId} from '../../utils/base.js'

const app = getApp()

Page({
  data: {
    addressee:'',
    sendname: '',
    content: '',
    font_count: 0,
    date: formatTime(new Date),
    time: +new Date
  },
  onLoad: function(option){
    //判断是否为草稿
    if (option.uuid) {
      this.setData({
        "uuid": option.uuid,
        "content": option.content,
        "font_count": option.content.length
      })
    }
    wx.showModal({
      title: '你正在写一份亲笔信，因此  ',
      content: '你需要写200+的字 \r\n 你需要花费10:00+分钟 \r\n 另外 \r\n 此信不能复制和粘贴 \r\n 您只能发送给1个微信好友',
      showCancel: false,
      confirmText: '知道了',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onReady: function(){

  },
  change(ev){
    this.setData({
      font_count: ev.detail.cursor,
      content: ev.detail.value
    })
  },
  addressee(ev){
    this.setData({
      addressee: ev.detail.value
    })
  },
  sendname(ev){
    this.setData({
      sendname: ev.detail.value
    })
  },
  save(){
    this.setData({
      time: +new Date - this.data.time
    })

    if (this.data.uuid) {
      var query = new wx.BaaS.Query()
      var Product = new wx.BaaS.TableObject(3701)
      query.compare('uuid', '=', this.data.uuid)

    } else {
      let uuid = letterId()
      let userInfo = wx.BaaS.storage.get('userinfo')
      let Product = new wx.BaaS.TableObject(3701)
      let product = Product.create()

      let draft = {
        "uuid": uuid,
        "user": Number(app.userInfo.id),
        "content": this.data.content,
        "time": this.data.time
      }
      console.log(draft.uuid);
      product.set(draft).save().then( (res) => {
        console.log(res,'ok');
        wx.navigateTo({
          url: '../../pages/index/index'
        })
        // success
      }, (err) => {
        // err
        console.log(err, 'err');
      })
    }
  },
  preview: function() {
    this.setData({
      time: +new Date - this.data.time
    })

    if (!this.data.content.length) {
        return
    }

    wx.navigateTo({
      url: '/pages/preview/preview?sendname='+this.data.sendname+'&content='+this.data.content+'&addressee='+this.data.addressee+'&time='+this.data.time
      // url: '/pages/preview/preview?sendname=333&content=22222&addressee=1111&time=6848&send_id=38944955&send_avatar=https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoTy7GKvduQo9v93RZEzUZ68rdtXVsZK1OaichRKRoHGkc5Pg0N9mXD6w66ib4kELJzcUU0qAxr5jIw/0'
    })
  },
})
