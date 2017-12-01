const has_user = (open_id) => {
  var Product = new wx.BaaS.TableObject(tableId)
  var query = new wx.BaaS.Query()

  query.compare('open_id', '=', open_id)

  return Product.setQuery(query).find().then( (res) => {
  // success
  }, (err) => {
    // err
  })

}

module.exports = {
  query: query
}
