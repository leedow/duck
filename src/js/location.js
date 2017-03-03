var urly = require('./url')

module.exports = {
  base: '',
  /**
   * @param {String} prefix on||off 是否自动加上前缀
   */
  go: function(url, params, prefix){
    var prefix = prefix||'on'
    var base = ''
    if(prefix == 'on'){
      base = this.base
    }
    for(var key in params){
      if(key == 'toastsuccess' || key == 'toasterror'){
        params.toasttime = parseInt(new Date().getTime()/1000)
      }
    }
    window.location.href = new urly(base + url).setParams(params).getHref()
  },
  back: function(){
    window.history.go(-1)
  },
  fresh: function(params){
    this.go(window.location.href, params , 'off')
  }
}
