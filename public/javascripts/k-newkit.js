(function(K) {
	K.NewKit = function(options) {
		var _c = K.Component({ id:'newkit' }, options);
		
		_c.oninit = function() {
			var $input = $('#title', '#' + _c.options.id);
			
			$('#' + _c.options.id + '-btn').click(function() {
				if(!$input.val()) {
					$input.addClass('error');
					return false;
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);