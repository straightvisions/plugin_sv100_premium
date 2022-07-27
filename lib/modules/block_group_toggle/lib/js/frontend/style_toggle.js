window.addEventListener('load', function() {
	[...document.querySelectorAll('a[href*="#sv_toggle_"]')].forEach(toggle_link => {
		toggle_link.addEventListener('click', function(event) {
			event.preventDefault();
			document.querySelector(this.getAttribute('href')).classList.toggle('active');
		});
		
		if(window.location.hash === toggle_link.getAttribute('href')){
			document.querySelector(window.location.hash).classList.add('active');
			history.replaceState(null, null, ' ');
		}
	});
});