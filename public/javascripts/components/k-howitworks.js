(function(K) {
	K.HowItWorks = function(options) {
		var _c = K.Component({
			id:'howitworks',
			duration: 3800,
			_times: 50
		}, options);
		
		var $slides,
			$indicators;
		
		var _interval,
			_current = 0,
			_previous = 0,
			_times = 0;
		
		function _moveSlide(advance) {
			if(_c.options.times && _c.options.times > 0 && _times > _c.options.times) {
				clearInterval(_interval);
				return;
			}
		
			$slides.removeClass('slide-previous');
			if(advance) {
				$($slides[_previous]).addClass('slide-previous').removeClass('slide-active').css('left', 'auto').animate({ right:'100%' }, 'normal', function() {
					$(this).css('right', 'auto');
				});
				$($slides[_current]).addClass('slide-active').css('left', '100%').animate({ left:0 }, 'normal');
			} else {
				$($slides[_previous]).addClass('slide-previous').removeClass('slide-active').css('left', 'auto').animate({ left:'100%' }, 'normal', function() {
					$(this).css('left', 'auto');
				});
				$($slides[_current]).addClass('slide-active').css('right', '100%').animate({ right:0 }, 'normal');
			}
			$($indicators[_previous]).removeClass('slide-indicator-active');
			$($indicators[_current]).addClass('slide-indicator-active');
		}
		
		function _advance() {	
			_previous = _current++;
			if(_current > $slides.length - 1) {
				_current = 0;
				_times++;
			}

			_moveSlide(true);
		}
		
		function _stepBack() {
			_previous = _current--;
			if(_current < 0) {
				_current = $slides.length - 1;
			}
			
			_moveSlide();
		}
		
		function _setupLoop() {
			_interval = setInterval(function() {
				_advance();
			}, _c.options.duration);
		}
		
		function _setupActions() {
			$('.slide-next').click(function() {
				if(_interval) {
					clearInterval(_interval);
				}
				_advance();
				_setupLoop();
			});
			
			$('.slide-prev').click(function() {
				if(_interval) {
					clearInterval(_interval);
				}
				_stepBack();
				_setupLoop();
			});
		}
		
		_c.oninit = function() {
			$slides = $('.slide');
			$indicators = $('.slide-indicators li');
			
			_setupActions();
			_setupLoop();
		};
		
		return _c.pub;
	};
})(Kitify);