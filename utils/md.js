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
  add_user: add_user
}
