export function getUniqueBlockId(props){
	let id = btoa( props.clientId ).replace(/[^a-z0-9]/gi,'');
	
	return id.substr( id.length - 12, 12);
}

export function isDuplicate(props){
	let output = false;

	const elements = document.querySelectorAll('.block-'+props.attributes.blockId);
	
	if(elements.length > 1){
		output = true;
	}
	
	return output;
}

// CSS GENERATION ------------------------------------------------------------------------------------------------------
export function generateCSS(selectors, blockId, isResponsive = false, screen = '') {
	let breakpoint = 0;
	let gen_css = '';
	let res_css = '';
	
	/* replace this later with backend user settings */
	switch(screen){
		
		case 'mobile'               : breakpoint = 0;break;
		case 'mobileLandscape'      : breakpoint = 0;break;
		case 'tablet'               : breakpoint = 768;break;
		case 'tabletLandscape'      : breakpoint = 992;break;
		case 'tabletPro'            : breakpoint = 1024;break;
		case 'tabletProLandscape'   : breakpoint = 1366;break;
		case 'desktop'              : breakpoint = 1600;break;
		default                     : breakpoint = 0;break;
		
	}
	/* --------------------------------------------- */
	
	for (let i in selectors) {
		let sel = selectors[i];
		let css = '';
		
		for (let j in sel) {
			let checkString = true;
			
			if(typeof sel[j] === 'string' && sel[j].length === 0){
				checkString = false;
			}
			
			if(typeof sel[j] !== 'undefined' && checkString){
				css += j + ': ' + sel[j] + ';';
			}
		}
		
		if(css !== ''){
			gen_css += blockId;
			gen_css += i + '{';
			gen_css += css;
			gen_css += '}';
		}
	}
	
	if(isResponsive && typeof gen_css !== 'undefined' && gen_css !== ''){
		let orientation = '';
		if(screen.includes('Landscape')){
			orientation = ' and (orientation: landscape)';
		}
		
		res_css += '@media(min-width: ' + breakpoint + 'px)'+ orientation +' {';
		res_css += gen_css;
		res_css += '}';
	}
	
	return isResponsive === true ? res_css : gen_css;
}

// CSS INJECTION -------------------------------------------------------------------------------------------------------
export function injectBlockListCSS(props){
	const ID = 'sv100-premium-gutenberg-extended-block-controls-' + props.attributes.blockId;
	let el = document.getElementById(ID);
	let ccsOutput = '';
	
	// css string gen
	Object.keys( props.attributes.parsedCSS ).map(function(key, index) {
		ccsOutput += props.attributes.parsedCSS[key];
	});
	
	if(ccsOutput === ''){
		ccsOutput = props.attributes.parsedCSSString; // fallback
	}
	
	if(el === null){
		el = document.createElement('style');
		el.setAttribute(
			'id',
			ID
		);
		el.innerHTML = ccsOutput;
		document.head.appendChild(el);
	}else{
		el.innerHTML = ccsOutput;
	}
	
	props.setAttributes({parsedCSSString: ccsOutput});
	
}