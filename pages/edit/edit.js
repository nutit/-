import {formatTime} from '../../utils/util.js'
import {letterId} from '../../utils/base.js'

Page({
  data: {
    addressee:'收件人',
    name: '发件人',
    content: '文本内容内容内容呢绒短发那是肯定发送咖啡呢拉森理发卡深南东路烦恼是亮点法拉盛贷款你发送',
    font_count: 0,
    date: formatTime(new Date),
    time: +new Date
  },
  onLoad: function(option){
    //判断是否为草稿
    if (option.uuid) {
      this.setData({
        "uuid": option.uuid
      })
    }
    
    wx.navigateTo({
      url: '/pages/preview/preview?name='+this.data.name+'&content='+this.data.content+'&addressee='+this.data.addressee+'&date='+this.data.date
    })

    return
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
  name(ev){
    this.setData({
      name: ev.detail.value
    })
  },
  save(){
    this.setData({
      time: +new Date - this.data.time
    })

    if (this.data.uuid) {
      var query = new wx.BaaS.Query()
      var Product = new wx.BaaS.TableObject(3701)
      query.compare('uuid', '=', 1212)

    } else {
      let uuid = letterId()
      let userInfo = wx.BaaS.storage.get('userinfo')
      let Product = new wx.BaaS.TableObject(3701)
      let product = Product.create()

      let draft = {
        "uuid": uuid,
        "user": Number(userInfo.openid),
        "content": this.data.content,
        "time": this.data.time
      }
      return
      product.set(draft).save().then( (res) => {
        console.log(res,'ok');
        // success
      }, (err) => {
        // err
        console.log(err, 'err');
      })


    }



  },
  preview: function() {
    wx.navigateTo({
      url: '/pages/preview/preview?name='+this.data.name+'&content='+this.data.content+'&addressee='+this.data.addressee+'&date='+this.data.date
    })
  },
})
