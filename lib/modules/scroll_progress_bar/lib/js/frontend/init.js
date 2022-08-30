window.onscroll = function() {
	let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrolled = (winScroll / height) * 100;
	document.querySelector('.sv100_premium_scroll_progress_bar_indicator').style.width = scrolled + "%";
};