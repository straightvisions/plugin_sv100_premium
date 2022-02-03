window.addEventListener('load', function() {
	const html = document.querySelectorAll('a[href*="#sv_custom_lightbox_"]');
	html.forEach(element =>
		element.addEventListener("click", function(event) {
				event.preventDefault();
				let el = document.querySelector(this.getAttribute("href"));
				if(el){
					el.classList.add("active");
				}
			}
		));

	document.addEventListener('click', function (event) {
		if(event.target.classList.contains('is-style-sv-hidden')){
			document.querySelector('.wp-block-group.is-style-sv-hidden').classList.remove("active");
		}
	}, false);
});