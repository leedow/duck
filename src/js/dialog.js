
function Dialog(type){
  this._ok = function(){}
  this._no = function(){}
  this.type = type //or confirm
  var _this = this


  this.ok = function(ok){
    this._ok = ok
  }

  this.no = function(no){
    this._no = no
  }


  this.open = function(content){

    if(_this.type == 'alert'){
      $('#alert').modal('show')
      $('#alert-content').text(content); // = content

      $('#alert-ok').one('click', function(){
        $('#alert').modal('hide')
        _this._ok()
      })
    }

    if(_this.type == 'confirm'){
      $('#confirm').modal('show')
      $('#confirm-content').text(content); // = content

      $('#confirm-ok').one('click', function(){
        _this._ok()
        $('#confirm').modal('hide')
      })

      $('#confirm-no').one('click', function(){
        _this._no()
        $('#confirm').modal('hide')
      })
    }
  }
}


var dalert = function(content){
  var d = new Dialog('alert')
  d.open(content)
  return d
}

var dconfirm = function(content){
  var d = new Dialog('confirm')
  d.open(content)
  return d
}

module.exports = {
  dalert: dalert,
  dconfirm: dconfirm
}
