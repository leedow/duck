
/**
 * 支持左右拖拽的表格
 * @param {sring} obj 目标容器
 */
module.exports.drag = function(obj){
  var aim = $(obj)
  var table = aim.find('table')
  var table_width = table.width()
  var table_height = table.outerHeight()

  aim.append('<div style="width:100%'+';height:'+table_height+'px"></div>')

  /**
   * 鼠标按下
   */
}
