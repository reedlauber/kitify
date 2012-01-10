(function(K) {
	var _m = {
		duration: 4000,
		timeout: null
	};
	
	_m.clearMessage = function() {
		if(_m.timeout) {
			clearTimeout(_m.timeout);
			_m.timeout = null;
		}
		$('.k-message').remove();
	};
	
	_m.showMessage = function(message, type, duration) {
		if(typeof type === 'number') {
			duration = type;
			type = '';
		}
		duration = duration || _m.duration;
		
		if(['info', 'success', 'warning', 'error'].indexOf(type) == -1) {
			type = '';
		}
		
		var $msg = $('<div class="k-message k-shadow" />').hide().prependTo('#container');
		var $inner = $('<div class="alert-message block-message" />').html(message).appendTo($msg);
		if(type) {
			$inner.addClass(type);
		}
		var $close = $('<a href="javascript:void(0)" class="close">&times;</a>').prependTo($inner).click(function() {
			_m.clearMessage();
		});
		$msg.slideDown();
		_m.timeout = setTimeout(function() {
			$msg.slideUp('fast', function() {
				_m.clearMessage();
			});
		}, duration);
	};
	
	K.Message = {
		clear: _m.clearMessage,
		show: _m.showMessage
	};
})(Kitify);