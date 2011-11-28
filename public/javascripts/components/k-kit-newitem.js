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
		
		var urlRe = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
		K.Form.validators['newitem-merchanturl'] = function($field, val, data) {
			if(!urlRe.test(val)) {
				K.Form.addValidationMsg('<strong>Merchant Link</strong> is not a valid URL.');
				return false;
			}
			return true;
		};
		
		K.Form.validators['newitem-quantity'] = function(field, val, data) {
			var intVal = parseInt(val, 10);
			if(!$.isNumeric(intVal)) {
				K.Form.addValidationMsg('<strong>Quantity</strong> must be a number.');
				return false;
			}
			if(val <= 0) {
				K.Form.addValidationMsg('<strong>Quantity</strong> must be a positive number.');
				return false;
			}
			data[field.prop] = intVal;
			return true;
		};
		
		K.Form.validators['newitem-price'] = function(field, val, data) {
			var floatVal = parseFloat(val);
			if(!$.isNumeric(floatVal)) {
				K.Form.addValidationMsg('<strong>Price</strong> must be a numeric amount.');
				return false;
			}
			if(floatVal < 0) {
				K.Form.addValidationMsg('<strong>Price</strong> must be a positive numeric amount.');
				return false;
			}
			data[field.prop] = floatVal;
			return true;
		};
		
		_c.oninit = function() {
			var kitSlug = $('#kit').attr('data-id');
			
			var form = K.Form.setup({
				context: '#newitem',
				fields: _c.options.fields,
				btns: {
					submit: '#kit-add-btn'
				}
			});
			
			$(form).bind('submit', function(evt, item) {
				item.slug = kitSlug;
				
				K.Data.save('/items', item, function(resp) {
					form.reset();
					$(K).trigger('item-created', [resp]);
				});
			});
		};
		
		return _c.pub;
	};
})(Kitify);