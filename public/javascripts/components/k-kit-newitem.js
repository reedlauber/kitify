(function(K) {
	K.NewItem = function(options) {
		var _c = K.Component({
			id: 'newitem',
			fields: [
				{ id:'newitem-name', prop:'name', required:true },
				{ id:'newitem-quantity', prop:'quantity', required:true },
				{ id:'newitem-merchanturl', prop:'merchant_url', required:true },
				{ id:'newitem-price', prop:'price', required:true },
				{ id:'newitem-notes', prop:'notes' }
			]
		}, options);
		
		function _resetForm() {
			$.each(_c.options.fields, function(i, field) {
				$('#' + field.id).val('');
			});
		}
		
		function _validateForm() {
			var valid = false;
			$.each(_c.options.fields, function(i, field) {
				var $field = $('#' + field.id).removeClass('error'),
					fieldValid = true,
					val = $field.val();

				if(field.required && !val) {
					fieldValid = false;
				}
				if(!fieldValid) {
					$field.addClass('error');
				}
				valid = valid && fieldValid;
			});
			return valid;
		}
		
		K.Form.validators['newitem-quantity'] = function($field, val, data) {
			var intVal = parseInt(val, 10);
			if(!$.isNumeric(intVal)) {
				K.Form.addValidationMsg('<strong>Quantity</strong> must be a number.');
				return false;
			}
			if(val <= 0) {
				K.Form.addValidationMsg('<strong>Quantity</strong> must be a positive number.');
				return false;
			}
			return true;
		};
		
		K.Form.validators['newitem-price'] = function($field, val, data) {
			var floatVal = parseFloat(val);
			if(!$.isNumeric(floatVal)) {
				K.Form.addValidationMsg('<strong>Price</strong> must be a dollar amount.');
				return false;
			}
			if(floatVal < 0) {
				K.Form.addValidationMsg('<strong>Price</strong> must be a positive dollar amount.');
				return false;
			}
			return true;
		};
		
		_c.oninit = function() {
			var kitId = $('#kit').attr('data-id');
			
			var form = K.Form.setup({
				context: '#newitem',
				btns: {
					submit: '#kit-add-btn'
				}
			});
			
			$(form).bind('form-submitted', function(evt, item) {
				item.kit_id = kitId;
				
				console.log(item);
				return;
				
				K.Data.save('/items', item, function(resp) {
					_resetForm();
					$(K).trigger('item-added', [resp]);
				});
			});
		};
		
		return _c.pub;
	};
})(Kitify);