Page({
  data: {
    name: '',
    input: '',
    name: '',
    font_count: 0,
    date: null
  },
  onLoad: function(){
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
  input(ev){
    console.log(ev);
  },
  show: function() {
    console.log('show');
  },
})
