import {formatTime} from '/util.js'

const search_user = (userInfo) => {
  let Product = new wx.BaaS.TableObject(3399)
  let query = new wx.BaaS.Query()
  let userData = {
    "user_id":  Number(userInfo.id),
    "nickName": userInfo.nickName,
    "open_id": userInfo.openid,
    "avatarUrl": userInfo.avatarUrl,
    "created_by": formatTime(new Date)
  }
  query.compare('user_id', '=', Number(userInfo.id))
  Product.setQuery(query).find().then( (res) => {
    if (res.statusCode !== 200 || !res.data.objects.length) {
      add_user(userData)
    }
    // success
  }, (err) => {

  })
}

const add_letter = (info) => {
  let Product = new wx.BaaS.TableObject(3396)
  let product = Product.create()
  let Data = {
    "user_id":  Number(info.user_id),
    "user_name": info.user_name,
    "content": info.content,
    "receuved_name": info.receuved_name,
    "time": Number(info.time)
  }

  product.set(Data).save().then( (res) => {
  // success
  wx.switchTab({
    url: '/pages/index/index'
  })

  }, (err) => {
    // err
  })

}

const add_received = (info) => {
  let Product = new wx.BaaS.TableObject(3395)
  let product = Product.create()
  let Data = {
    "user_id":  Number(info.send_id),
    "user_name": info.addressee,
    "content": info.content,
    "send_name": info.sendname,
    "send_avatar": info.send_avatar,
    "time": Number(info.time)
  }

  product.set(Data).save().then( (res) => {
  // success

  }, (err) => {
    // err
  })

}


const add_user = (data) => {
  let Product = new wx.BaaS.TableObject(3399)
  let product = Product.create()

  return product.set(data).save().then( (res) => {
  // success
    return res
  }, (err) => {
    return err
    // err
  })
}

module.exports = {
  search_user: search_user,
  add_user: add_user,
  add_letter: add_letter,
  add_received: add_received
}
