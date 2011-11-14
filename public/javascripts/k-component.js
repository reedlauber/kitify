(function(K) {
	K.Component = function(defaults, options) {
		var _c = {
			options: $.extend({ target:'#content' }, defaults, options),
			pub: {}
		};
		
		_c.pub.init = function(manager) {
			_c.manager = manager;
			
			if(_c.oninit) {
				_c.oninit.call(_c);
			}
			
			return _c.pub;
		};
		
		return _c;
	};
})(Kitify);