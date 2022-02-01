window.addEventListener('load', function() {
	[...document.querySelectorAll('a[href*="#sv_toggle_"]')].forEach(toggle_link => {
		toggle_link.addEventListener('click', function(event) {
			event.preventDefault();
			document.querySelector(this.getAttribute('href')).classList.toggle('active');
		});
	});
});