let isInViewport = function(elem) {
	let rect = elem.getBoundingClientRect();
	return (
		elem.offsetHeight > 0 // element is rendered
		&& (rect.bottom - (window.innerHeight / 2)) >= 0
		&& rect.right >= 0
		&& (rect.top + (window.innerHeight / 2)) <= (window.innerHeight || document.documentElement.clientHeight)
		&& rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);
};