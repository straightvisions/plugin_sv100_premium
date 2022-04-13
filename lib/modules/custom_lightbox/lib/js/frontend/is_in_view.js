window.addEventListener('load', function() {
	// Open Lightbox per In View Trigger
	const elements_in_view	= js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.element_in_view;
	
	Object.entries(elements_in_view).forEach(element => {
		// make function name lightbox-specific to allow removing specific eventlistener when multiple scroll-events are registered.
		let unique_element = element[0].replace('#', '');
		let dynamic_function = {
			[unique_element]: function (event) {
				if (document.querySelector(element[1]) !== null) {
					if (isInViewport(document.querySelector(element[1]))) {
						if (document.querySelector(element[0]) !== null) {
							sv_custom_lightbox_open( document.querySelector(element[0]) );
							window.removeEventListener('scroll', dynamic_function[unique_element]);
						}
					}
				}
			}
		};
		
		window.addEventListener('scroll', dynamic_function[unique_element], false);
	});
});