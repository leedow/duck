/**
 * @param {String} obj 选择器名
 * @param {Object} config{autoclose, width}
 */
function sdialog(obj, config){
  this.obj = null
  this.config = config||{autoclose:false, width: 400}
  _this = this

  if(typeof obj == 'string'){
    this.obj = $(obj)
  } else {
    this.obj = obj
  }

  this.obj.find('.close').click(function(){
    _this.close()
  })


  if(this.config.autoclose){
    $('body').click(function(){

      _this.close()
    })

    _this.obj.click(function(){
      return false
    })
  }

  this.obj.css({width:  _this.config.width+'px', right: -_this.config.width+'px'})

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

module.exports = function(obj, config){
  return new sdialog(obj, config)
}
