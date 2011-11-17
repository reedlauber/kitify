(function(K) {
	K.EditItem = function(options) {
		var _c = K.Component({ id:'edititem' }, options);
		
		var $table,
			$ctrls;
		
		_c.oninit = function() {
			$table = $('#kit-items');
			$ctrls = $('.k-kit-ctrls');
			
			$(document).on('hover', '#kit-items tbody tr', function(evt) {
				if(evt.type === 'mouseenter') {
					$ctrls.appendTo($('.k-kit-items-anchor', this)).show();	
				} else {
					$ctrls.hide();
				}
			});
			
			$('.k-kit-ctrls-edit', $ctrls).click(function() {
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
						});
					});
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);