var urly = require('./url')

function Toast(){
  var autoflag = true
  var _this  = this

  this.close = function(){
    $('#toast').animate({
      top: '-50px'
    }, 'fast', _this._done)
    return this
  }

  this.open = function(content , limit, autoclose){
    if($('#toast').length==0 ){
      $('body').append('<div id="toast"></div>')
    }
    $('#toast').html(content).animate({
      top: '50px'
    }, 'fast')

    if(autoclose){
      setTimeout(function(){
        _this.close()
      }, limit||2000)
    }

    return this
  }


  this.success = function(content, limit){
    this.open('<div  class="alert alert-shadow alert-success"><i class="icon iconfont icon-roundcheckfill"></i> '+content+'</div>', limit, true)
    return this
  } //


  this.error = function(content, limit){
    this.open('<div  class="alert alert-shadow alert-danger"><i class="icon iconfont icon-infofill"></i> '+content+'</div>', limit, true)
    return this
  }


  this.loading = function(content, limit){
    //alert('fsd')
    this.open('<div  class="alert alert-shadow alert-info">'+content+'</div>', limit)
    return this
  }


  this._done = function(){}
  this.done = function(done){
    _this._done = done
  }
}

var dtoast = {
  obj: false,
  success: function(content, limit){
    this.obj = new Toast()
    this.obj.success(content, limit)
    return this.obj
  },
  error: function(content, limit){
    this.obj = new Toast()
    this.obj.error(content, limit)
    return this.obj
  },
  loading: function(content, limit){
    this.obj = new Toast()
    this.obj.loading(content, limit)
    return this.obj
  },
  /**
   * 当浏览器带有相关GET参数时，自动弹出一条提示
   */
  auto: function(){
    this.obj = new Toast()
    var url = new urly(window.location.href)
    var toastsuccess = url.getParams().toastsuccess||false
    var toasterror = url.getParams().toasterror||false
    var toasttime = url.getParams().toasttime||0
    var currenttime = parseInt(new Date().getTime()/1000)
    if(currenttime - toasttime >5){
      return
    }
    if(toastsuccess){
      this.obj.success(toastsuccess)
      //autoflag = true
    }
    if(toasterror){
      this.obj.error(toasterror)
      //autoflag = true
    }
  }
}

module.exports = dtoast
