export function getUniqueBlockId(props){
	let id = btoa( props.clientId ).replace(/[^a-z0-9]/gi,'');
	
	return id.substr( id.length - 12, 12);
}

export function isDuplicate(props){
	let output = false;

	const elements = document.querySelectorAll('.sv100-premium-block-core-'+props.attributes.blockId);
	
	if(elements.length > 1){
		output = true;
	}
	
	return output;
}

export function getBlockClassSelector(name, attr){
	const { blocks } = wp;
	
	// exceptions / edge cases -------------------------------------------------------
	if(name.includes('paragraph')){ return 'p'; }
	
	if(name.includes('heading')){
		if(typeof attr !== 'undefined' && typeof attr.level !== 'undefined'){
			return 'h' + attr.level;
		}
		
		return '';
	}
	
	if(name.includes('list')){
		if(typeof attr !== 'undefined' && typeof attr.ordered !== 'undefined' && attr.ordered === true){
			return 'ol';
		}
		return 'ul';
	}
	// exceptions / edge cases -------------------------------------------------------

	
	return '.' + blocks.getBlockDefaultClassName(name);
}

export function getValueWithUnit(cssValue, defaultUnit = ''){
		// check for empty values
	if(cssValue === '' || cssValue === null || cssValue === 0 || typeof cssValue === 'undefined'){
		return cssValue;
	}
	// integer values to string
	cssValue = cssValue.toString();
	// check for auto
	if(cssValue.includes('auto')){
		return cssValue;
	}
	
	// cssValue already has a unit
	if( /px|%|em|rem|vh|vw/.test(cssValue) ){
		return cssValue;
	}
	
	// default fallback
	return cssValue + defaultUnit;
}

// CSS GENERATION ------------------------------------------------------------------------------------------------------
export function generateCSS(selectors, blockId, isResponsive = false, screen = '', breakpoint_calc = 'from', reverseSelector = false) {
	let gen_css = '';
	let res_css = '';
	
	/* replace this later with backend user settings */
	const breakpoints = {
		mobile:                 {value: 0, before: 'none', after: 'tablet'},
		mobileLandscape:        {value: 0, before: 'mobile', after: 'tabletLandscape'},
		tablet:                 {value: 768, before: 'mobileLandscape', after: 'tabletPro'},
		tabletLandscape:        {value: 992, before: 'tablet', after: 'tabletProLandscape'},
		tabletPro:              {value: 1024, before: 'tabletLandscape', after: 'desktop'},
		tabletProLandscape:     {value: 1366, before: 'tabletPro', after: 'desktop'},
		desktop:                {value: 1600, before: 'tabletProLandscape', after: 'none'},
	
	};
	
	if(typeof breakpoints[screen] === 'undefined'){
		screen = 'mobile'; // fallback
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
			if(reverseSelector === true){
				gen_css += blockId+i;
			}else{
				gen_css += i+blockId;
			}
			
			gen_css += '{';
			gen_css += css;
			gen_css += '}';
		}
	}
	
	if(isResponsive && typeof gen_css !== 'undefined' && gen_css !== ''){
		
		
		let media = '';
		//sv style
		if(breakpoint_calc === 'from'){
			media = '@media(min-width: ' + breakpoints[screen].value + 'px)';
		}
		//reversed
		if(breakpoint_calc === 'till'){
			media = '@media(max-width: ' + breakpoints[screen].value + 'px)';
		}
		//between
		if(breakpoint_calc === 'between'){
			media = '@media(min-width: ' + breakpoints[screen].value +'px)';
			// look around after
			if(breakpoints[screen].after !== 'none' && typeof breakpoints[breakpoints[screen].after] !== 'undefined'){
				
				// exception for mobile 0,0
				if(breakpoints[screen].value === breakpoints[breakpoints[screen].after].value){
					const _after = breakpoints[breakpoints[screen].after];
					
					if(_after.after !== 'none' && typeof breakpoints[ _after.after ] !== 'undefined'){
						media += ' and ';
						media += '(max-width: ' + (breakpoints[ _after.after ].value - 1) +'px)';
					}
					
				}else{
					media += ' and ';
					media += '(max-width: ' + (breakpoints[ breakpoints[screen].after ].value - 1) +'px)';
				}
				
			}
			
		}
		
		let orientation = '';
		if(screen !== 'mobile' && screen !== 'desktop'){
			if(screen.includes('Landscape')){
				orientation = ' and (orientation: landscape)';
			}else{
				orientation = ' and (orientation: portrait)';
			}
		}
		
		
		res_css += media + orientation +' {';
		res_css += gen_css;
		res_css += '}';
	}
	
	return isResponsive === true ? res_css : gen_css;
}

// CSS INJECTION -------------------------------------------------------------------------------------------------------
export function injectBlockListCSS(props){
	const css = props.attributes.parsedCSSString;
	const ID = 'sv100-premium-gutenberg-extended-block-controls-' + props.attributes.blockId;
	let el = document.getElementById(ID);
	
	if(el === null){
		el = document.createElement('style');
		el.setAttribute(
			'id',
			ID
		);
		el.innerHTML = css;
		document.head.appendChild(el);
	}else{
		el.innerHTML = css;
	}
	
}

export function updateCSS(val, props, _name, _prefix, EditorStyles, appendix = ''){
	// clone attributes
	const attr = Object.assign({}, props.attributes);
	// assign new value
	// we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
	attr.parsedCSS = JSON.parse(attr.parsedCSS);
	attr[_prefix+attr.currentResponsiveTab+appendix] = val;
	// parse settings specific css
	attr.parsedCSS[_name] = EditorStyles(attr, props.name);
	//collapse css objects
	let css = '';
	Object.keys( attr.parsedCSS ).map(function(key, index) {
		css += attr.parsedCSS[key];
	});
	
	// update properties for rerender and injection
	props.setAttributes({
			[_prefix+attr.currentResponsiveTab+appendix]: attr[_prefix+attr.currentResponsiveTab+appendix],
			parsedCSS: JSON.stringify(attr.parsedCSS),
			parsedCSSString: css, // this gets injected
		});
}


export function updateCSSWithDimensions(values, props, _name, _prefix, EditorStyles, appendix = ''){
	// clone attributes
	const attr = Object.assign({}, props.attributes);
	// assign new value
	// we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
	attr.parsedCSS = JSON.parse(attr.parsedCSS);

	attr[_prefix + 'Top' + attr.currentResponsiveTab + appendix]        = typeof values['top'] === 'undefined' ? '' : values['top'];
	attr[_prefix + 'Right' + attr.currentResponsiveTab + appendix]      = typeof values['right'] === 'undefined' ? '' : values['right'];
	attr[_prefix + 'Bottom' + attr.currentResponsiveTab + appendix]     = typeof values['bottom'] === 'undefined' ? '' : values['bottom'];
	attr[_prefix + 'Left' + attr.currentResponsiveTab + appendix]       = typeof values['left'] === 'undefined' ? '' : values['left'];

	// parse settings specific css
	attr.parsedCSS[_name] = EditorStyles(attr, props.name);
	//collapse css objects
	let css = '';
	Object.keys( attr.parsedCSS ).map(function(key, index) {
		css += attr.parsedCSS[key];
	});
	
	// update properties for rerender and injection
	props.setAttributes({
		[_prefix + 'Top' + attr.currentResponsiveTab + appendix]:       attr[_prefix + 'Top' + attr.currentResponsiveTab + appendix],
		[_prefix + 'Right' + attr.currentResponsiveTab + appendix]:     attr[_prefix + 'Right' + attr.currentResponsiveTab + appendix],
		[_prefix + 'Bottom' + attr.currentResponsiveTab + appendix]:    attr[_prefix + 'Bottom' + attr.currentResponsiveTab + appendix],
		[_prefix + 'Left' + attr.currentResponsiveTab + appendix]:      attr[_prefix + 'Left' + attr.currentResponsiveTab + appendix],
		parsedCSS: JSON.stringify(attr.parsedCSS),
		parsedCSSString: css, // this gets injected
	});
}

export function updateCSSWithDimensionsCorners(values, props, _name, _prefix, EditorStyles, appendix = '') {
	// clone attributes
	const attr = Object.assign({}, props.attributes);
	// assign new value
	// we have to keep the object as string due the fact that gutenberg / react doesn't detect changes in arrays correctly
	attr.parsedCSS = JSON.parse(attr.parsedCSS);
	
	attr[_prefix + 'TopLeft' + attr.currentResponsiveTab + appendix] = typeof values['top'] === 'undefined' ? '' : values['top'];
	attr[_prefix + 'TopRight' + attr.currentResponsiveTab + appendix] = typeof values['right'] === 'undefined' ? '' : values['right'];
	attr[_prefix + 'BottomLeft' + attr.currentResponsiveTab + appendix] = typeof values['bottom'] === 'undefined' ? '' : values['bottom'];
	attr[_prefix + 'BottomRight' + attr.currentResponsiveTab + appendix] = typeof values['left'] === 'undefined' ? '' : values['left'];
	
	// parse settings specific css
	attr.parsedCSS[_name] = EditorStyles(attr, props.name);
	//collapse css objects
	let css = '';
	Object.keys(attr.parsedCSS).map(function (key, index) {
		css += attr.parsedCSS[key];
	});
	
	// update properties for rerender and injection
	props.setAttributes({
		[_prefix + 'TopLeft' + attr.currentResponsiveTab + appendix]: attr[_prefix + 'TopLeft' + attr.currentResponsiveTab + appendix],
		[_prefix + 'TopRight' + attr.currentResponsiveTab + appendix]: attr[_prefix + 'TopRight' + attr.currentResponsiveTab + appendix],
		[_prefix + 'BottomLeft' + attr.currentResponsiveTab + appendix]: attr[_prefix + 'BottomLeft' + attr.currentResponsiveTab + appendix],
		[_prefix + 'BottomRight' + attr.currentResponsiveTab + appendix]: attr[_prefix + 'BottomRight' + attr.currentResponsiveTab + appendix],
		parsedCSS: JSON.stringify(attr.parsedCSS),
		parsedCSSString: css, // this gets injected
	});
}

export function updateCSSWithValue(val, props, _name, _prefix, EditorStyles){
	// clone attributes
	const attr = Object.assign({}, props.attributes);
	// assign new value
	attr[_prefix+attr.currentResponsiveTab] = val;
	//attr[_prefix+attr.currentResponsiveTab].unit = unit;
	// parse settings specific css
	attr.parsedCSS[_name] = EditorStyles(attr, props.name);
	//collapse css objects
	let css = '';
	Object.keys( attr.parsedCSS ).map(function(key, index) {
		css += attr.parsedCSS[key];
	});
	
	// update properties for rerender and injection
	props.setAttributes({
		[_prefix+attr.currentResponsiveTab]: attr[_prefix+attr.currentResponsiveTab],
		parsedCSS: props.parsedCSS.concat(attr.parsedCSS),
		parsedCSSString: css, // this gets injected
	});
}

export function mergeCSSValuesToString(val1, val2, val3 = '', val4 = ''){
	let output = 'undefined';
	
	// check if vals are available (indicates that the value was set
	if(typeof val1 === 'undefined' || typeof val2 === 'undefined'){
		// abort
	}else{
		output = val1.toString();
		output += ' ' + val2.toString();
		
		if(val3 !== ''){
			output += ' ' + val3.toString();
		}
		
		if(val4 !== ''){
			output += ' ' + val4.toString();
		}
	}
	
	return output;
}

// handle classNames
export function addClassNames(props, list = []){
	const _list = typeof props.attributes._classNamesList !== 'undefined' ? props.attributes._classNamesList : [];
	
	return [...new Set([..._list,...list])]
}

export function removeClassNames(props, list = []){
	const _list = typeof props.attributes._classNamesList !== 'undefined' ? props.attributes._classNamesList : [];

	for(let i = 0; i < list.length; i++){
		const pos = _list.indexOf( list[i] );
		if ( pos >= 0 ) {
			_list.splice(  pos, 1);
		}
		
	}
	
	return [...new Set([...[],..._list])]
}