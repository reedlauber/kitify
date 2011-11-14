(function(K) {
	K.Kit = function(options) {
		var _c = K.Component({ id:'kit' }, options);
		
		var $table,
				$addRow;
		
		var _itemTmpl = ['<tr data-id="{{id}}">',
							 '<td><span class="k-item-value">{{name}}</span></td>',
							 '<td><span class="k-item-value">{{quantity}}</span></td>',
							 '<td><span class="k-item-value">{{merchant_url}}</span></td>',
							 '<td><span class="k-item-value">{{price}}</span></td>',
							 '<td><span class="k-item-value">{{notes}}</span></td>',
						 '</tr>'].join('');
		var _editTmpl = ['<tr>',
							 '<td><input id="item-name" type="text" class="span4" value="" /></td>',
							 '<td><input id="item-quantity" type="text" class="span1" value="1" /></td>',
							 '<td><input id="item-merchantlink" type="text" class="span5" value="" /></td>',
							 '<td><input id="item-price" type="text" class="span2" value="" /></td>',
							 '<td><input id="item-notes" type="text" class="span6" value="" /></td>',
						 '</tr>',
						 '<tr>',
						 	'<td colspan="5">',
								'<a id="kit-edit-btn" href="javascript:void(0)" class="btn small">Add</a>',
								'<a href="javascript:void(0)">Cancel</a>',
							'</td>',
						 '</tr>'].join('');
		
		function _setupEvents() {
			$('#kit-add-btn').click(function() {
				$('tbody', $table).append(_itemTmpl);
				
				$addRow.hide();
			});
		}
		
		_c.oninit = function() {
			$table = $('#' + _c.options.id + '-items');
			
			$(K).bind('item-added', function(evt, item) {
				console.log(item);
				var row = K.template(_itemTmpl, item);
				$('tbody', $table).append(row);
			});
		};
		
		return _c.pub;
	};
})(Kitify);