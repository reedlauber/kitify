(function(K) {
	var _f = {};
	
	_f.validationMsgs = [];
	
	_f.clearValidationMsgs = function() {
		_f.validationMsgs = [];
		$('.k-validation-msgs').remove();
	};
	
	_f.showValidationMsgs = function() {
		if(_f.validationMsgs.length) {
			var $vm = $('<div class="k-validation-msgs k-shadow" />').hide().prependTo('#container');
			var $inner = $('<div class="alert-message block-message error" />').appendTo($vm);
			var timeout = setTimeout(function() {
				$vm.slideUp('fast', function() {
					_f.clearValidationMsgs();	
				});
			}, 4000);
			var $close = $('<a href="javascript:void(0)" class="close">&times;</a>').appendTo($inner).click(function() {
				clearTimeout(timeout);
				_f.clearValidationMsgs();
			});
			var $list = $('<ul />').appendTo($inner);
			$.each(_f.validationMsgs, function(i, msg) {
				$('<li />').html(msg).appendTo($list);
			});
			$vm.slideDown();
		}
	};
	
	_f.getValue = function($field) {
		return $field.val();
	};
	
	_f.validate = function(fields) {
		var valid = true, requiredValid = true, data = {};
		
		_f.clearValidationMsgs();
		
		$.each(fields, function(i, field) {
			var $f = $('#' + field.id).removeClass('error'),
				val = _f.getValue($f),
				fieldValid = true;
				
			if((field.required || $f.attr('required')) && !val) {
				fieldValid = false;
				requiredValid = false;
			}
			
			if(fieldValid && field.prop) {
				data[field.prop] = val;
			}
			
			if(fieldValid && K.Form.validators[$f.attr('id')]) {
				fieldValid = K.Form.validators[$f.attr('id')](field, val, data);
			}
			
			if(!fieldValid) {
				$f.addClass('error');
			}
			
			valid = valid && fieldValid;
		});
		
		if(!valid) {
			if(!requiredValid) {
				_f.validationMsgs.splice(0, 0, 'Please fill out all required fields.');
			}
			
			_f.showValidationMsgs();
			
			data = null;
		}
		
		return data;
	};
	
	K.Form = {
		validators: {}
	};
	
	K.Form.addValidationMsg = function(msg) {
		_f.validationMsgs.push(msg);
	};
	
	K.Form.setup = function(options) {
		var _self = {},
			_options = $.extend({
				context: 'body',
				fields: [],
				data: {},
				btns: {}
			}, options);
		
		var $fields = $('.k-field', _options.context);
		
		if(_options.btns.submit) {
			$(_options.btns.submit).click(function() {
				var data = _f.validate(_options.fields);
				data = $.extend(_options.data, data);
				if(data) {
					$(_self).trigger('submit', [data]);
				}
			});
		}
		
		_self.reset = function() {
			$.each(_options.fields, function(i, field) {
				$('#' + field.id).val('');
			});
		};
		
		return _self;
	};
})(Kitify);