function getScrollPercent() {
	var h = document.documentElement,
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';
	return Math.round((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
}

window.addEventListener('load', function() {
	// Open Lightbox per In View Trigger
	const show_when_percent_scrolled	= js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.show_when_percent_scrolled;
	
	Object.entries(show_when_percent_scrolled).forEach(element => {
		// make function name lightbox-specific to allow removing specific eventlistener when multiple scroll-events are registered.
		let unique_element = element[0].replace('#', '');
		let dynamic_function = {
			[unique_element]: function (event) {
				if (getScrollPercent() > element[1]) {
					if (document.querySelector(element[0]) !== null) {
						sv_custom_lightbox_open( document.querySelector(element[0]) );
						window.removeEventListener('scroll', dynamic_function[unique_element]);
					}
				}
			}
		};
		
		window.addEventListener('scroll', dynamic_function[unique_element], false);
	});
});