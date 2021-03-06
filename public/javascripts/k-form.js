(function(K) {
	var _f = {},
		_v = K.Validation;
	
	_f.getValue = function(field, $field) {
		return $field.val();
	};
	
	_f.validate = function(fields) {
		var valid = true, requiredValid = true, data = {};
		
		_v.clearMsgs();
		
		$.each(fields, function(i, field) {
			var $f = field.$ctrl.removeClass('error'),
				val = _f.getValue(field, $f),
				fieldValid = true;
			
			if(!_v.validators.required(field, $f, val, data)) {
				fieldValid = false;
				requiredValid = false;
			}
			
			var validator = _v.validators[field.validator || '_none'] || _v.validators[$f.attr('id')];
			
			if(validator) {
				fieldValid = fieldValid && validator(field, $f, val, data);
			}

			if(fieldValid && field.prop) {
				data[field.prop] = val;
			}
			
			if(!fieldValid) {
				$f.addClass('error');
			}
			
			valid = valid && fieldValid;
		});
		
		if(!valid) {
			if(!requiredValid) {
				_v.prependMsg('Please fill out all required fields.');
			}
			
			_v.showMsgs();
			
			data = null;
		}
		
		return data;
	};
	
	_f.setupFields = function(context, fields) {
	};
	
	K.Form = {};
	
	K.Form.setup = function(options) {
		var _self = {},
			_options = $.extend({
				context: 'body',
				fields: [],
				data: {},
				btns: {}
			}, options);
			
		function _submit() {
			var data = _f.validate(_options.fields);
			if(data) {
				data = $.extend(_options.data, data);
				$(_self).trigger('submit', [data]);
			}
		}
		
		$.each(_options.fields, function(i, field) {
			field.$ctrl = $('#' + field.id, _options.context);
			if(field.submit) {
				field.$ctrl.keyup(function(evt) {
					if(evt.which === 13) {
						_submit();
					}
				});
			}
		});
		
		if(_options.btns.submit) {
			$(_options.btns.submit).click(function() {
				_submit();
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