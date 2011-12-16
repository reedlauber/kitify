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
								'<input type="text" id="item-notes" value="{{notes}}" class="span2" />',
							 '</td>',
							'<td>',	
								'<div class="k-kit-ctrls">',
									'<a href="javascript:void(0)" class="k-kit-ctrls-save btn small primary">save</a>',
									'<a href="javascript:void(0)" class="k-kit-ctrls-cancel btn small">cancel</a>',
								'</div>',
							'</td>',
						 '</tr>'].join('');
		
		function _setupEdit($row) {
			var item = $row.data('item');
			if(item) {
				var $editRow = $(K.template(_editTmpl, item)).insertAfter($row);
				
				var form = K.Form.setup({
					context: $editRow,
					fields: _c.options.fields,
					data: item,
					btns: {
						submit: $('.k-kit-ctrls-save', $editRow)
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
			}
		}
		
		_c.oninit = function() {
			$table = $('#kit-items');
			$ctrls = $('#kit-items-editctrls');
			
			$(document).on('hover', '#kit-items tbody tr', function(evt) {
				if(!$(this).hasClass('k-items-editrow')) {
					if(evt.type === 'mouseenter') {
						$('.k-kit-ctrls', this).show();
					} else {
						$('.k-kit-ctrls', this).hide();
					}
				}
			});
			
			$('#kit-items tbody').click(function(evt) {
				var $target = $(evt.target),
					$row = $target.parents('tr');
					
				if($target.hasClass('k-kit-ctrls-cancel')) {
					$('.k-items-editrow').remove();
					$('.k-kit-item-editing').removeClass('k-kit-item-editing');
				} else if($target.hasClass('k-kit-ctrls-edit')) {
					// clear out any existing edit rows
					$('.k-items-editrow').remove();
					$('.k-kit-item-editing').removeClass('k-kit-item-editing');
					
					// hide display row
					$row.addClass('k-kit-item-editing');
					
					// setup edit row
					_setupEdit($row);
				} else if($target.hasClass('k-kit-ctrls-delete')) {
					var id = $row.attr('data-id');
					if(id) {
						K.Data.del('/items/' + id, function(resp) {
							$row.fadeOut(function() {
								$row.remove();
								$(K).trigger('item-deleted', [resp.id]);
							});
						});
					}
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);