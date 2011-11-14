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
		
		_c.oninit = function() {
			var kitId = $('#kit').attr('data-id');
			
			$('#kit-add-btn').click(function() {
				var valid = true, item = { kit_id:kitId };
				
				$.each(_c.options.fields, function(i, field) {
					var $field = $('#' + field.id);
					
					var val = $field.val();
					if(field.required && !val) {
						valid = false;
						$field.addClass('error');
					}
					item[field.prop] = $field.val();
				});
				
				if(valid) {
					K.Data.save('/items', item, function(resp) {
						$(K).trigger('item-added', [resp]);
					});
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);