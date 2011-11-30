(function(K) {
	K.EditItem = function(options) {
		var _c = K.Component({
			id:'edititem',
			fields: [
				{ id:'item-name', prop:'name', required:true },
				{ id:'item-quantity', prop:'quantity', required:true },
				{ id:'item-merchanturl', prop:'merchant_url', required:true },
				{ id:'item-price', prop:'price', required:true },
				{ id:'item-notes', prop:'notes' }
			]
		}, options);
		
		var $table,
			$ctrls;
		
		var _editTmpl = ['<tr class="k-items-editrow">',
							 '<td><input type="text" id="item-name" value="{{name}}" class="span3" required /></td>',
							 '<td><input type="number" id="item-quantity" value="{{quantity}}" class="span1" required /></td>',
							 '<td><input type="url" id="item-merchanturl" value="{{merchant_url}}" class="span4" required /></td>',
							 '<td>',
								'<div class="input-prepend">',
									'<span class="add-on">$</span>',
									'<input type="number" id="item-price" value="{{price}}" class="span2" required />',
								'</div>',
							 '</td>',
							 '<td>',
								'<div class="k-kit-items-anchor">',
									'<input type="text" id="item-notes" value="{{notes}}" class="span4" />',
									'<div id="kit-items-savectrls" class="k-kit-ctrls k-corner-right">',
										'<a href="javascript:void(0)" class="k-kit-ctrls-save btn small primary">save</a>',
										'<a href="javascript:void(0)" class="k-kit-ctrls-cancel btn small">cancel</a>',
									'</div>',
								'</div',
							 '</td>',
						 '</tr>'].join('');
		
		function _setupEdit($row) {
			var item = $row.data('item');
			if(item) {
				$row.hide();
				$ctrls.detach();
				var $editRow = $(K.template(_editTmpl, item)).insertAfter($row);
				$('#kit-items-savectrls').show();
				
				var form = K.Form.setup({
					context: $editRow,
					fields: _c.options.fields,
					data: item,
					btns: {
						submit: '.k-kit-ctrls-save'
					}
				});
				$(form).bind('submit', function(evt, edited) {
					K.Data.save('/items/' + edited.id, edited, function(resp) {
						if(resp && resp.success !== false) {
							resp.price = parseFloat(resp.price);
							$editRow.remove();
							$(K).trigger('item-updated', [resp, $row]);
						}
					});
				});
				$('.k-kit-ctrls-cancel', $editRow).click(function() {
					$row.show();
					$editRow.remove();
				});
			}
		}
		
		_c.oninit = function() {
			$table = $('#kit-items');
			$ctrls = $('#kit-items-editctrls');
			
			$(document).on('hover', '#kit-items tbody tr', function(evt) {
				if(!$(this).hasClass('k-items-editrow')) {
					if(evt.type === 'mouseenter') {
						$ctrls.appendTo($('.k-kit-items-anchor', this)).show();	
					} else {
						$ctrls.hide();
					}
				}
			});
			
			$('.k-kit-ctrls-edit', $ctrls).click(function() {
				var $row = $(this).parents('tr');
				if($row.length) {
					_setupEdit($row);
				}
			});
			
			$('.k-kit-ctrls-delete', $ctrls).click(function() {
				$ctrls.hide();
				var $row = $(this).parents('tr');
				var id = $row.attr('data-id');
				if(id) {
					K.Data.del('/items/' + id, function(resp) {
						$row.fadeOut(function() {
							$ctrls.appendTo('#kit');
							$row.remove();
							$(K).trigger('item-deleted', [resp.id]);
						});
					});
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);