// Video settings
const video_settings = {
	fullscreen: js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.enable_video_fullscreen,
	autoplay: js_sv100_premium_custom_lightbox_scripts_custom_lightbox_js.enable_video_autoplay,
};

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