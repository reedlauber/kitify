(function(K) {
	K.Kit = function(options) {
		var _c = K.Component({ id:'kit', components:{} }, options);
		
		var $table;
		
		var _itemTmpl = ['<tr data-id="{{id}}">',
							 '<td class="k-kit-items-name">{{name}}</td>',
							 '<td>{{quantity}}</td>',
							 '<td>{{merchant_url}}</td>',
							 '<td>{{price}}</td>',
							 '<td><div class="k-kit-items-anchor">{{notes}}</div></td>',
						 '</tr>'].join('');
		
		_c.oninit = function() {
			$table = $('#' + _c.options.id + '-items');
			
			if($('#' + _c.options.id).hasClass('editable')) {
				$.each(_c.options.components, function(p, c) {
					c.init(_c.pub);
				});
			}
			
			$(K).bind('item-added', function(evt, item) {
				$('.k-kit-items-none', $table).remove();
				
				var row = K.template(_itemTmpl, item);
				$('tbody', $table).append(row);
			});
		};
		
		return _c.pub;
	};
})(Kitify);