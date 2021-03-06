(function(K) {
	K.Kit = function(options) {
		var _c = K.Component({ id:'kit', components:{} }, options),
			_items = [];
		
		var $shareBox,
			$table;
		
		var _noItemsTmpl = '<tr class="k-kit-items-none"><td colspan="6">Start adding items above.</td></tr>';
		var _itemTmpl = ['<tr data-id="{{id}}">',
							 '<td class="k-kit-items-name">{{name}}</td>',
							 '<td>{{quantity}}</td>',
							 '<td class="k-kit-items-url"><a href="{{merchant_url}}" target="_blank">{{merchant_url}}</a></td>',
							 '<td>{{price}}</td>',
							 '<td>{{notes}}</td>',
							 '<td>',
								'<div class="k-kit-ctrls">',
									'<a href="javascript:void(0)" class="k-kit-ctrls-edit btn small primary">edit</a>',
									'<a href="javascript:void(0)" class="k-kit-ctrls-delete btn small danger">delete</a>',
								'</div>',
							 '</td>',
						 '</tr>'].join('');
		
		function _formatItem(item) {
			var formatted = $.extend(true, {}, item);
			
			if(typeof item.price === 'number') {
				formatted.price = '$' + item.price.toFixed(2);	
			}
			
			return formatted;
		}
		
		function _appendRow($target, item) {
			var formatted = _formatItem(item),
				row = K.template(_itemTmpl, formatted);
			$(row).appendTo($target).data('item', item);
		}
		
		function _updateRow($row, item) {
			var formatted = _formatItem(item),
				row = K.template(_itemTmpl, formatted);
			$row.replaceWith($(row).data('item', item));
		}
		
		function _renderItems() {
			var $tbody = $('tbody', $table).empty();
			if(!_items.length) {
				$('tbody', $table).append(_noItemsTmpl);
			} else {
				$.each(_items, function(i, item) {
					item.price = parseFloat(item.price);
					_appendRow($tbody, item);
				});
			}
		}
		
		function _setupShareBox() {
			var $share = $('<li class="k-kit-share"></li>').prependTo('.secondary-nav');
			$('<a href="javascript:void(0)">Share</a>').appendTo($share).click(function() {
				var open = $shareBox.data('open');
				if(open) {
					$shareBox.data('open', false).stop().fadeOut();
				} else {
					$shareBox.data('open', true).stop().fadeIn();
				}
			});
			
			var shareUrl = 'http://kitify.com/' + _c.pub.username + '/' + _c.pub.slug;
			$shareBox = $('<div class="k-kit-sharebox k-corner-all k-shadow" />').appendTo($share).hide()
							.append('<input type="text" class="k-input" value="' + shareUrl + '" />')
							.append('Copy and share with friends')
							.append('<div class="k-kit-sharebox-arrow" />');
							//.append('<div class="k-kit-sharebox-close"></div>');
			
			setTimeout(function() {
				$shareBox.data('open', true).stop().fadeIn();
			}, 2000);
		}
		
		_c.oninit = function() {
			_c.pub.username = $('#' + _c.options.id).attr('data-username');
			_c.pub.slug = $('#' + _c.options.id).attr('data-id');
			_c.pub.token = $('#' + _c.options.id).attr('data-token');
			
			if(_c.pub.token) {
				_setupShareBox();	
			}
			
			$table = $('#' + _c.options.id + '-items');
			
			if($('#' + _c.options.id).hasClass('editable')) {
				$.each(_c.options.components, function(p, c) {
					c.init(_c.pub);
				});
			}
			
			K.Data.get('/' + _c.pub.username + '/' + _c.pub.slug + '/items', function(resp) {
				_items = resp;
				_renderItems();
			});
			
			$(K).bind('item-created', function(evt, item) {
				$('.k-kit-items-none', $table).remove();
				_appendRow($('tbody', $table), item);
			});
			
			$(K).bind('item-updated', function(evt, item, $row) {
				_updateRow($row, item);
			});
			
			$(K).bind('item-deleted', function(evt, id) {
				if(!$('tbody tr', $table).length) {
					$('tbody', $table).append(_noItemsTmpl);
				}
			});
		};
		
		return _c.pub;
	};
})(Kitify);