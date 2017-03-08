ksidebar = function(){

  $('.open-sidebar-right').click(function(){
    var aim = $(this).data('aim')
    $('.sidebar-right').each(function(){
      $(this).css({right: -$(this).width()+'px'})
    })
    $('#'+aim).animate({right: '0px'})
  })

  $('.sidebar-right .close').click(function(){
    var sidebar = $(this).parents('.sidebar-right')
    sidebar.animate({right: -sidebar.width()+'px'})
  })
}

/**
 * @param {String} obj 选择器名
 */
function sdialog(obj, autoclose){
  this.obj = null
  _this = this

  if(typeof obj == 'string'){
    this.obj = $(obj)
  } else {
    this.obj = obj
  }

  this.obj.find('.close').click(function(){
    _this.close()
  })

  if(autoclose){
    $('body').click(function(){
      _this.close()
    })
  }

  /**
   * 打开对话框
   */
  this.open = function(){
    _this.obj.animate({right: '0px'})
  }

  /**
   * 关闭对话框
   */
  this.close = function(){
    _this.obj.animate({right: -_this.obj.width()+'px'})
  }

  /**
   * 重绘内容
   */
  this.draw = function(){

  }
}


module.exports = function(obj){
  return new sdialog(obj)
}
