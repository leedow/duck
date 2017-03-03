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
 * @param {Object} data 如果存在，则自动填充表单
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

  this.clean = function(){
    if(typeof this.formObj == 'string'){
 			var form = $(this.formObj);
 		} else {
 			var form = this.formObj;
 		}

 	 	form.find('input').val('');
 	 	form.find('textarea').val('');
    return this
  }

  //根据ID填充表单
  this.autofill = function(data){
    for(var  key in data){
      $(key).val(data[key])
    }
  }
 }


module.exports = {
  create: function(formObj, btnObj){
    return new Form(formObj, btnObj)
  },
  verify: Verify
}
