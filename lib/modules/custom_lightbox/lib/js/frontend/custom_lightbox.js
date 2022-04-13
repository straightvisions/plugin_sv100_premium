window.addEventListener('load', function() {
	// Open Lightbox per Click
	const click_id = document.querySelectorAll(js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.selector);

	click_id.forEach(element => {
		element.addEventListener('click', function (event) {
			event.preventDefault();
			let el = document.querySelector(this.getAttribute('href'));
			if (el) {
				sv_custom_lightbox_open(el);
				sv_custom_lightbox_open_handle_video(el, video_settings);
			}
		});
		//ios
		element.addEventListener('touchend', function (event) {
			event.preventDefault();
			let el = document.querySelector(this.getAttribute('href'));
			if (el) {
				sv_custom_lightbox_open(el);
				sv_custom_lightbox_open_handle_video(el, video_settings);
			}
		});
	});
	
	// Close Lightbox
	document.addEventListener('click', function (event) {
		if(
			event.target.classList.contains('is-style-sv-hidden') ||
			event.target.parentNode.parentNode.classList.contains('is-style-sv-lightbox-close-button')
		){
			let lightboxes = document.querySelectorAll('.wp-block-group.is-style-sv-hidden');
			lightboxes.forEach(el => sv_custom_lightbox_close(el) );
		}
	}, false);
});

function sv_custom_lightbox_open(el){
	if(el != null){
		el.classList.add('active');
	}
}

function sv_custom_lightbox_close(el){
	if(el != null && el.classList.contains('active')){
		el.classList.remove('active');
		
		if(el.classList.contains('has-video') === true){
			sv_custom_lightbox_close_handle_video(el);
		}
		
	}
}

/*
document.addEventListener('scroll', sv_custom_lightbox_scroll_percentage);
function sv_custom_lightbox_scroll_percentage(){
	if ( window.innerWidth > 799 ) {
		if ( window.scrollY > window.innerHeight ) {
			document.querySelector('#sv100_companion_sv_scroll_to_top').classList.add('show')
		} else {
			document.querySelector('#sv100_companion_sv_scroll_to_top').classList.remove('show')
		}
	}
}*/