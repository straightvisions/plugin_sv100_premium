function injectBlockListCSS(props, setAttributes){
	const styleID = 'sv100-premium-gutenberg-extended-block-controls-' + props.attributes.blockId;
	const element = document.getElementById(styleID);
	console.log('injectCSS');
	console.log(props);
	
	if (null !== element && undefined !== element) {
		let ccsOutput = '';
		Object.keys( props.attributes.parsedCSS ).map(function(key, index) {
			ccsOutput += props.attributes.parsedCSS[key];
		});
		
		if(ccsOutput === ''){
			ccsOutput = props.attributes.parsedCSSString; // fallback
		}
		
		element.innerHTML = ccsOutput;
		setAttributes({parsedCSSString: ccsOutput});
	}else{
		const $style = document.createElement('style');
		$style.setAttribute(
			'id',
			styleID
		);
		document.head.appendChild($style);
	}
}

export default injectBlockListCSS;