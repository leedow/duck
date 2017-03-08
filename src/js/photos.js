
/**
 * 图集处理
 * 依赖template.js, ajaxfileupload.js
 * @param obj 目标
 * @param tmp 模板
 * @param deleteCallback 删除回调
 * @param config {obj, tmp, input}
 */
function kpics(obj, tmp, data, deleteCallbacke){
  this.old = obj
  this.obj = $(obj)
  this.tmp = tmp
  this.data = data
  this.deleteCallback = function(){}
  this.deleteCallback  = deleteCallbacke
  var _this = this


//  _this.deleteCallback()

  this.init = function(){

    this.render()

    $(this.old).on('mouseover mouseout',   '.pic-box' , function(event){
      if(event.type == "mouseover"){
       $(this).find('.control').css('display', 'block')
      }else if(event.type == "mouseout"){
       $(this).find('.control').css('display', 'none')
      }
    })

    $(this.old).on('click',  '.pic-box .control' , function(){
      //_this.deleteCallback()
      var id = $(this).data('id')
      kconfirm('', '确定删除该图片？', function(){
        _this.deleteCallback(id)
      }  )
    })

  }

  this.addData = function(data){
    this.data.push(data)
    this.render()
  }

  this.deleteData = function(keyName, keyVal){
    for(var key in this.data){
      if(this.data[key][keyName] == keyVal){
        this.data.splice(key, 1)
      }
    }
  }

  /**
   * 渲染视图
   */
  this.render = function(){
    this.obj.html(template(tmp, {
      data: this.data
    }))
  }

  this.init()
}
