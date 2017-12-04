const letterId = () => {

  let idStr = Date.now().toString(36)

  return idStr
}


module.exports = {
  letterId: letterId
}
