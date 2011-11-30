(function(K) {
	K.NewItem = function(options) {
		var _c = K.Component({
			id: 'newitem',
			fields: [
				{ id:'newitem-name', prop:'name', label:'Product Name', required:true },
				{ id:'newitem-quantity', prop:'quantity', label:'Quantity', validator:'positiveInteger', required:true },
				{ id:'newitem-merchanturl', prop:'merchant_url', label:'Merchant URL', validator:'url', required:true },
				{ id:'newitem-price', prop:'price', label:'Price', validator:'positiveNumeric', required:true },
				{ id:'newitem-notes', prop:'notes', label:'Notes' }
			]
		}, options);
		
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
					if(resp && resp.success !== false) {
						form.reset();
						resp.price = parseFloat(resp.price);
						$(K).trigger('item-created', [resp]);
					}
				});
			});
		};
		
		return _c.pub;
	};
})(Kitify);