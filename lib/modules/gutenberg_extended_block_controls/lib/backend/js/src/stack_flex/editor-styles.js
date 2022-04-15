import generateCSS from "../generateCSS";

function EditorStyles(props) {
	const wpBlockSelector = '.wp-block-columns';
	
	const {
	stackDesktop,
	stackMobile,
	stackMobileLandscape,
	stackTablet,
	stackTabletLandscape,
	stackTabletPro,
	stackTabletProLandscape,
	} = props.attributes;
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
		  'flex-direction': stackMobile !== '' ? (stackMobile === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
		  'margin-top': 'var(--gap)'
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackMobileLandscape !== '' ? (stackMobileLandscape === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'flex-direction': stackTablet !== '' ? (stackTablet === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletLandscape !== '' ? (stackTabletLandscape === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletPro !== '' ? (stackTabletPro === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletProLandscape !== '' ? (stackTabletProLandscape === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'flex-direction': stackDesktop !== '' ? (stackDesktop === true ? 'column !important' : 'row !important') : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': 'var(--gap)'
		},
	};
	  
	let css = '';
	const blockId = `.block-${props.attributes.blockId}`;
	
	css += generateCSS(mobile, blockId, true, 'mobile');
	css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape');
	css += generateCSS(tablet, blockId, true, 'tablet');
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape');
	css += generateCSS(tabletPro, blockId, true, 'tabletPro');
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape');
	css += generateCSS(desktop, blockId, true, 'desktop');
	
	return css;
}

export default EditorStyles;
