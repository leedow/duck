/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Form = __webpack_require__(1)
	var Dialog = __webpack_require__(2)
	var Toast = __webpack_require__(3)


	window.kform = Form;
	window.ktoast = Toast


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * 表单校验和数据获取
	 */
	 var Format = {
	 	type: {
	 		required: {
	 			reg: /.{1,}/,
	 			msg: '此项不能为空'
	 		},
	 		email: {
	 			reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	 			msg: '邮箱格式错误'
	 		},
	 		phone: {
	 			reg: /^\d{11}$/,
	 			msg: '手机格式错误'
	 		},
	 		float: {
	 			reg: /^\d+(.\d+)?$/,
	 			msg: '必须为整数或小数'
	 		},
	 		int: {
	 			reg: /^\d+$/,
	 			msg: '必须为整数'
	 		}
	 	},
	 	doo: function(required, format, value){
	 		var _this = this;
	 		try{
	 			var value = value.replace(/\s/, '');
	 		} catch (e){
	 			var value = '';
	 		}
	 		if(required){
	 			if(!_this.type['required'].reg.test(value)){
	 				return {
	 					state: false,
	 					msg: _this.type['required'].msg
	 				};
	 			}
	 		}

	 		if(_this.type[format] == undefined){
	 			return {
	 				state: true
	 			};
	 		}

	 		if(_this.type[format].reg.test(value)){
	 			return {
	 				state: true
	 			};
	 		} else {
	 			if(value == ''){
	 				return {
	 					state: true
	 				}
	 			}
	 			return {
	 				state: false,
	 				msg: _this.type[format].msg
	 			};
	 		}
	 	}
	 }


	 var Verify = {
	 	_data: {},
	 	_flag: true,
	 	_check: function(obj){

	 		var _this = this;
	 		obj.each(function(){
	 			var required = $(this).data('required')?$(this).data('required'):false;
	 			var format = $(this).data('format')?$(this).data('format'):'';
	 			var ignore = $(this).data('ignore')||false;
	 			var value = $(this).val();
	 			var name = $(this).attr('name');

	 			if(ignore){ return true;}

	 			var res = Format.doo(required, format, value);
	 			if(!res.state){
	 				_this.set($(this), res.msg);
	 				_this._flag = false;
	 				if(name)
	 					delete _this._data[name];
	 			} else {
	 				if(name){
	 					_this._data[name] = value;
	 				}
	 				_this.set($(this), '');
	 			}

	 		});
	 	},
	 	getData: function(){
	 		return this._data;
	 	},
	 	check: function(obj){
	 		this._flag = true;
	 		if(typeof obj == 'string'){
	 			var form = $(obj);
	 		} else {
	 			var form = obj;
	 		}

	 	 	var inputs = form.find('input');
	 	 	var selects = form.find('select');
	 	 	var textarea = form.find('textarea');
	 	 	this._data = {};
	 	 	this._check(inputs);
	 	 	this._check(selects);
	 	 	this._check(textarea);
	 	 	return this._flag;
	 	},
	 	set: function(aim, info){
	    if(info != ''){
	      aim.parents('.form-group').addClass('has-error')
	      aim.next('p').remove()
	      aim.parent().append('<p class="form-group-error">'+info+'</p>')
	    } else {
	      aim.parents('.form-group').removeClass('has-error')
	      aim.next('p').remove()
	    }

	 	}
	}

	/**
	 * 表单处理
	 */
	function Form(formObj, btnObj){
	 	this.request = false;
	 	this.btn = null;
	 	this.btnText = '';
	 	this.formObj = formObj;

	 	this.setBtn = function(btnObj){
	 		if(typeof btnObj == 'string'){
	 			this.btn = $(btnObj);
	 		} else {
	 			this.btn = btnObj;
	 		}
	 		this.btnText = this.btn.text();
	 		return this;
	 	}

	 	if(btnObj)
	 		this.setBtn(btnObj);

	 	this.submit = function(callback){
	 		if(Verify.check(this.formObj) && !this.request){
	 			//提交预处理
	 			this.request = true;
	 			this.btn.text('处理中');
	 			var data = Verify.getData();

	 		    //数据AJAX提交
	 		    callback(data)

	 		}
	 		return this;
	 	}

	 	this.reset = function(){
	 		this.btn.text(this.btnText);
	 	 	this.request = false;
	 	 	return this
	 	}


	 }


	module.exports = {
	  create: function(formObj, btnObj){
	    return new Form(formObj, btnObj)
	  },
	  verify: Verify
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);