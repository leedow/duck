var Toast = {
  open: function(content){
    if($('#toast').length==0 ){
      $('body').append('<div id="toast"></div>')
    }
    $('#toast').html(content).animate({
      top: '50px'
    })
    setTimeout(function(){
      $('#toast').animate({
        top: '-50px'
      })
    }, 2000)


  },
  success: function(content){
    this.open('<div  class="alert alert-shadow alert-success"><i class="icon iconfont icon-roundcheckfill"></i> '+content+'</div>')
  },
  error: function(content){
    this.open('<div  class="alert alert-shadow alert-danger"><i class="icon iconfont icon-infofill"></i> '+content+'</div>')
  },
  loading: function(content){
    this.open('<div  class="alert alert-shadow alert-info">'+content+'</div>')
  }
}

module.exports = Toast
