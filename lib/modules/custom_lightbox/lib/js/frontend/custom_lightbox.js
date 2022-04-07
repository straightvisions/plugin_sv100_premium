window.addEventListener('load', function() {
	// Video settings
	const video_settings = {
		fullscreen: js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.enable_video_fullscreen,
		autoplay: js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.enable_video_autoplay,
	};

	// Open Lightbox per Click
	const click_id = document.querySelectorAll(js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.selector);

	click_id.forEach(element =>
		element.addEventListener('click', function(event) {
			event.preventDefault();
			let el = document.querySelector(this.getAttribute('href'));
			if(el){
				sv_custom_lightbox_open(el);
				sv_custom_lightbox_open_handle_video(el, video_settings);
			}
		}
	));

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

// handle video events / controls when lightbox is opened
function sv_custom_lightbox_open_handle_video(el, settings){
	const video = el.querySelector('video');
	const id = '#' + el.getAttribute('id');
	
	if(video != null){
		// add marker to parent element
		el.classList.add('has-video');
		
		// switch to fullscreen
		if(settings.fullscreen[id] != null && settings.fullscreen[id] == true){
			
			// chrome, firefox
			if(video.requestFullscreen){
				video.requestFullscreen();
			}else
			// safari
			if(video.webkitRequestFullscreen){
				video.webkitRequestFullscreen();
			}else
			// iOS
			if(video.webkitEnterFullscreen){
				// iOS fix
				video.classList.add('is-fullscreen');
				video.webkitEnterFullscreen();
			}
		}
		
		// play the video
		if(settings.autoplay[id] != null && settings.autoplay[id] == true){
			video.play();
		}
		
		// bind events
		// close lightbox if user exists fullscreen
		const handle_fullscreen_switch = (e) => {
			if(video.classList.contains('is-fullscreen')){
				// remove control class
				video.classList.remove('is-fullscreen');
				// unbind event to prevent double binding issues
				// chrome, firefox
				if( video.requestFullscreen )            { video.removeEventListener('fullscreenchange', handle_fullscreen_switch); }
				// safari
				else if( video.webkitRequestFullscreen ) { video.removeEventListener('webkitfullscreenchange', handle_fullscreen_switch); }
				// iOS
				else if( video.webkitEnterFullscreen )   { video.removeEventListener('pause', handle_fullscreen_switch); }
				
				// close lightbox
				sv_custom_lightbox_close(el);
			}else{
				video.classList.add('is-fullscreen');
			}
		};
		
		// the actual bind
		// chrome, firefox
		if( video.requestFullscreen )               { video.addEventListener('fullscreenchange', handle_fullscreen_switch); }
		// safari
		else if( video.webkitRequestFullscreen )    { video.addEventListener('webkitfullscreenchange', handle_fullscreen_switch); }
		// iOS
		else if( video.webkitEnterFullscreen )      { video.addEventListener('pause', handle_fullscreen_switch);  }
		
		
		
	}
	
}

// pause the video when lightbox is closed
function sv_custom_lightbox_close_handle_video(el){
	const video = el.querySelector('video');
	
	if(video != null){
		video.pause();
	}
}