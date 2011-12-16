(function(K) {
	/* Private helper */
	var _v = {
		msgs: [],
		timeout: null
	};
	
	/* Public Validation Namespace */
	V = {
		addMsg: function(html) {
			_v.msgs.push(html);
		},
		prependMsg: function(html) {
			_v.msgs.splice(0, 0, html);
		},
		clearMsgs: function() {
			if(_v.timeout) {
				clearTimeout(_v.timeout);
				_v.timeout = null;
			}
			_v.msgs = [];
			$('.k-validation-msgs').remove();
		},
		showMsgs: function() {
			if(_v.msgs.length) {
				var $vm = $('<div class="k-validation-msgs k-shadow" />').hide().prependTo('#container');
				var $inner = $('<div class="alert-message block-message error" />').appendTo($vm);
				_v.timeout = setTimeout(function() {
					$vm.slideUp('fast', function() {
						V.clearMsgs();
					});
				}, 4000);
				var $close = $('<a href="javascript:void(0)" class="close">&times;</a>').appendTo($inner).click(function() {
					V.clearMsgs();
				});
				var $list = $('<ul />').appendTo($inner);
				$.each(_v.msgs, function(i, msg) {
					$('<li />').html(msg).appendTo($list);
				});
				$vm.slideDown();
			}
		}
	};
	
	/* Validator Functions */
	V.validators = {};
	
	V.validators.required = function(field, $ctrl, val) {
		if((field.required || $ctrl.attr('required')) && !val) {
			return false;
		}
		return true;
	};
	
	V.validators.numeric = function(field, $ctrl, val) {
		var numericVal = parseFloat(val);
		if(!$.isNumeric(numericVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		return true;
	};

	V.validators.positiveNumeric = function(field, $ctrl, val) {
		var numericVal = parseFloat(val);
		if(!$.isNumeric(numericVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		if(numericVal <= 0) {
			V.addMsg('<strong>' + field.label + '</strong> must be a positive number.');
			return false;
		}
		return true;
	};
	
	V.validators.integer = function(field, $ctrl, val) {
		var intVal = parseFloat(val);
		if(!$.isNumeric(intVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a number.');
			return false;
		}
		return true;
	};

	V.validators.positiveInteger = function(field, $ctrl, val) {
		var intVal = parseInt(val, 10);
		if(!$.isNumeric(intVal)) {
			V.addMsg('<strong>' + field.label + '</strong> must be a integer.');
			return false;
		}
		if(intVal <= 0) {
			V.addMsg('<strong>' + field.label + '</strong> must be a positive integer.');
			return false;
		}
		return true;
	};
	
	var _urlRe = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	V.validators.url = function(field, $ctrl, val) {
		if(!_urlRe.test(val)) {
			V.addMsg('<strong>' + field.label + '</strong> is not a valid URL.');
			return false;
		}
		return true;
	};
	
	K.Validation = V;
})(Kitify);