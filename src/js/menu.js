/**
 * 菜单根据地址显示选中状态
 * @param {String||Object} 菜单选择器
 */
module.exports.init(obj){
  var div = typeof obj=='string'?$(obj):obj

  var items = div.find('li')

  items.each(function(){
    
  })

}
