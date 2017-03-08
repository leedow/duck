module.exports = {
  find: function(aim, key, value){
    var res = ''
    for(var i=0; i<aim.length; i++){

      try{
        if(aim[i][key] == value){
          res = aim[i]
        }
      }catch(e){
        console.log(key + '不存在')
      }

    }
    return res
  }
}
