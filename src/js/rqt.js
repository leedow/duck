/*
 * @param url: '/test'
 * @param data: JSON
 * @param success: function
 * @param error: function 可以不传
 */
var current_post = '';
var current_get = '';

module.exports = {
  before: function(data){
    return true
  },
  error: function(){

  },
	post: function(url, data, success, error){
		if(error == undefined) {var error = function(){}};
    this.handle(url, data, success, error, 'post')
	},
	get: function(url, data, success, error){
		if(error == undefined) {var error = function(){}};
		this.handle(url, data, success, error, 'get')
	},
  handle: function(url, data, success, error,  type){
    var _this = this
    $.ajax({
			url: url,
			type: type,
			data: data,
			success: function(data){
        if(_this.before(data)){
          success(data)
        }
			},
			error: function(){
        if(error()){
          _this.error()
        }
			}
		});
  }
};
