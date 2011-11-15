(function(K) {
	K.KitTitle = function(options) {
		var _c = K.Component({ id:'kit-title' }, options);
		
		var $labelOuter,
				$label,
			$inputOuter,
				$input;
		
		function _setupEvents() {
			$label.click(function() {
				$labelOuter.hide();
				$inputOuter.show();
				$input.val($labelOuter.attr('data-val')).focus();
			});
			$input.blur(function() {
				var val = $input.val();
				if(val) {
					$label.text(val);
					$labelOuter.attr('data-val', val);
				}
				$labelOuter.show();
				$inputOuter.hide();
			});
		}
		
		_c.oninit = function() {
			$labelOuter = $('.k-kit-title-label');
			$inputOuter = $('.k-kit-title-input');
			
			$label = $('.k-kit-title-label h1');
			$input = $('input', $inputOuter);
			
			_setupEvents();
		};
		
		return _c.pub;
	};
})(Kitify);