(function(K) {
	K.KitTitle = function(options) {
		var _c = K.Component({ id:'kit-title' }, options);
		
		var $labelOuter,
				$label,
			$inputOuter,
				$input;
		
		var _title = '';
		
		function _updateKitTitle(newTitle) {
			var val = $input.val();
			if(val && val != _title) {
				_title = val;
				$label.text(val);
				$labelOuter.attr('data-val', val);
				K.Data.save('/' + _c.manager.username + '/' + _c.manager.slug + '/' + _c.manager.token, { title:val }, function(resp) {
					if(resp.success !== false){
						window.location.href = '/' + _c.manager.username + '/' + resp.slug + '/' + resp.token;
					}
				});
			}
			$labelOuter.show();
			$inputOuter.hide();
		}
		
		function _setupEvents() {
			$label.click(function() {
				$labelOuter.hide();
				$inputOuter.show();
				$input.val($labelOuter.attr('data-val')).focus();
			});
			$input.blur(function() {
				_updateKitTitle();
			}).keyup(function(evt) {
				if(evt.which === 13) {
					_updateKitTitle();
				}
			});
		}
		
		_c.oninit = function() {
			$labelOuter = $('.k-kit-title-label');
			$inputOuter = $('.k-kit-title-input');
			
			$label = $('.k-kit-title-label h1');
			$input = $('input', $inputOuter);
			
			_title = $label.text();
			
			_setupEvents();
		};
		
		return _c.pub;
	};
})(Kitify);