(function(K) {
	K.Manager = function(options) {
		var _self = {},
			_options = $.extend({
				target: '#content',
				components: {}
			}, options);
		
		_self.init = function() {
			$.each(_options.components, function(n, c) {
				c.init(_self);
			});
			
			return _self;
		};
		
		return _self;
	};
})(Kitify);