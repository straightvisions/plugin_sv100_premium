window.addEventListener('load', function() {
	// Open Lightbox per Click
	const click_id = document.querySelectorAll(js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.selector);

	click_id.forEach(element =>
		element.addEventListener("click", function(event) {
			event.preventDefault();
			let el = document.querySelector(this.getAttribute("href"));
			if(el){
				el.classList.add("active");
			}
		}
	));

	// Open Lightbox per In View Trigger
	const elements_in_view	= js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.element_in_view;

	Object.entries(elements_in_view).forEach(element => {
		window.addEventListener('scroll', function(event) {
			if(document.querySelector(element[1]) !== null) {
				if (isInViewport(document.querySelector(element[1]))) {
					if (document.querySelector(element[0]) !== null) {
						console.log(document.querySelector(element[0]));
						document.querySelector(element[0]).classList.add("active");
					}
				}
			}
		}, false);
	});

	// Close Lightbox
	document.addEventListener('click', function (event) {
		if(
			event.target.classList.contains('is-style-sv-hidden') ||
			event.target.parentNode.parentNode.classList.contains('is-style-sv-lightbox-close-button')
		){
			let lightboxes = document.querySelectorAll('.wp-block-group.is-style-sv-hidden');
			lightboxes.forEach(element =>  element.classList.remove("active"));
		}
	}, false);
});