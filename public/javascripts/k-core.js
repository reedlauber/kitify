var Kitify = {
	log: function(m) {
		if(window.console) {
			console.log(m);
		}
	},
	template: function(template, data) {
	    return Mustache.to_html(template, data);
	}
};