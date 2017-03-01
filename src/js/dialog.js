
window.kconfirm = function(content, ok, no){
  var ok = ok||function(){}
  var no = no||function(){}
  $('#confirm').modal('show')
  $('#confirm-content').text(content); // = content

  $('#confirm-ok').one('click', function(){
    ok()
    $('#confirm').modal('hide')
  })

  $('#confirm-no').one('click', function(){
    no()
    $('#confirm').modal('hide')
  })
}


window.kalert = function(content, ok ){
  var ok = ok||function(){}
  $('#alert').modal('show')
  $('#alert-content').text(content); // = content

  $('#alert-ok').one('click', function(){
    $('#alert').modal('hide')
    ok()
  })
}
