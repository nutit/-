//index.js
//获取应用实例
const app = getApp()

Page( {
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    received_list: [],
    send_list: [],
    draft_list: [],
    username: ''
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      "username": app.userInfo.nickName
    })
    this.getreceived()
    this.getsend()
    this.getdraft()
  },
  getreceived: function() {
    let recordID = Number(app.userInfo.id)
    let Product = new wx.BaaS.TableObject(3395)
    let query = new wx.BaaS.Query()
    // 设置查询条件（比较、字符串包含、组合等）
    query.compare('user_id', '=',  recordID)
    Product.setQuery(query).find().then( (res) => {
      this.setData({
        "received_list": res.data.objects
      })
    }, (err) => {
      console.log(err);
    })
  },
  getsend: function(){
    let recordID = Number(app.userInfo.id)
    let Product = new wx.BaaS.TableObject(3396)
    let query = new wx.BaaS.Query()
    query.compare('user_id', '=',  recordID)
    Product.setQuery(query).find().then( (res) => {
      this.setData({
        "send_list": res.data.objects
      })
    }, (err) => {
      console.log(err);
    })
  },
  getdraft: function() {
    let recordID = Number(app.userInfo.id)
    let Product = new wx.BaaS.TableObject(3701)
    let query = new wx.BaaS.Query()
    query.compare('user', '=',  recordID)
    Product.setQuery(query).find().then( (res) => {
      this.setData({
        "draft_list": res.data.objects
      })
      console.log(this.data.draft_list);
    }, (err) => {
      console.log(err);
    })
  },
  bindChange: function( e ) {
    var that = this;
    that.setData( { currentTab: e.detail.current });
  },
  show_preview: function(event) {
    if (event.currentTarget.dataset.id) {
      this.setData({
        "content": event.currentTarget.dataset.content,
        "time": event.currentTarget.dataset.time,
        "uuid": event.currentTarget.dataset.id
      })
      wx.navigateTo({
        url: '../../pages/edit/edit?content='+this.data.content+'&time='+this.data.time+'&uuid='+this.data.uuid
      })
    } else {
      this.setData({
        "sendname": event.currentTarget.dataset.sendname,
        "content": event.currentTarget.dataset.content,
        "addressee": event.currentTarget.dataset.username,
        "time": event.currentTarget.dataset.time,
        "send_id": Number(app.userInfo.id)
      })

      wx.navigateTo({
        url: '/pages/preview/preview?sendname='+this.data.sendname+'&content='+this.data.content+'&addressee='+this.data.addressee+'&time='+this.data.time+'&send_id='+this.data.send_id
        // url: '/pages/preview/preview?sendname=333&content=22222&addressee=1111&time=6848&send_id=38944955&send_avatar=https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoTy7GKvduQo9v93RZEzUZ68rdtXVsZK1OaichRKRoHGkc5Pg0N9mXD6w66ib4kELJzcUU0qAxr5jIw/0'
      })
    }

  },
  swichNav: function( e ) {
    var that = this;
    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
      })
    }
  }
})
