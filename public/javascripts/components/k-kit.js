(function(K) {
	K.Kit = function(options) {
		var _c = K.Component({ id:'kit', components:{} }, options);
		
		var $table;
		
		var _itemTmpl = ['<tr data-id="{{id}}">',
							 '<td class="k-kit-items-name">{{name}}</td>',
							 '<td>{{quantity}}</td>',
							 '<td class="k-kit-items-url"><a href="{{merchant_url}}" target="_blank">{{merchant_url}}</a></td>',
							 '<td>{{price}}</td>',
							 '<td><div class="k-kit-items-anchor">{{notes}}</div></td>',
						 '</tr>'].join('');
		
		function _formatItem(item) {
			var formatted = $.extend(true, {}, item);
			
			if(typeof item.price === 'number') {
				formatted.price = '$' + item.price.toFixed(2);	
			}
			return formatted;
		}
		
		_c.oninit = function() {
			$table = $('#' + _c.options.id + '-items');
			
			if($('#' + _c.options.id).hasClass('editable')) {
				$.each(_c.options.components, function(p, c) {
					c.init(_c.pub);
				});
			}
			
			$(K).bind('item-added', function(evt, item) {
				$('.k-kit-items-none', $table).remove();
				
				var formatted = _formatItem(item);
				var row = K.template(_itemTmpl, formatted);
				$('tbody', $table).append(row);
			});
		};
		
		return _c.pub;
	};
})(Kitify);