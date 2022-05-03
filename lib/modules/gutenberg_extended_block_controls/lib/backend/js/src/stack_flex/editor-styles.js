import {generateCSS, getBlockClassSelector} from "../helpers";


function EditorStyles(attr, name) {
	const wpBlockSelector = '.wp-block-columns';
	
	const {
	stackDesktop,
	stackMobile,
	stackMobileLandscape,
	stackTablet,
	stackTabletLandscape,
	stackTabletPro,
	stackTabletProLandscape,
	stackReverseDesktop,
	stackReverseMobile,
	stackReverseMobileLandscape,
	stackReverseTablet,
	stackReverseTabletLandscape,
	stackReverseTabletPro,
	stackReverseTabletProLandscape,
	} = attr;
	
	const appendix = ' !important';
	let reverse = '';
	// selectors
	reverse = stackReverseMobile === true ? '-reverse' : '';
	const mobile = {
		[wpBlockSelector]: {
		  'flex-direction': stackMobile !== '' ? (stackMobile === true ? 'column'+reverse+' !important' : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
		  'margin-top': stackMobile === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseMobileLandscape === true ? '-reverse' : '';
	const mobileLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackMobileLandscape !== '' ? (stackMobileLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackMobileLandscape === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseTablet === true ? '-reverse' : '';
	const tablet = {
		[wpBlockSelector]: {
			'flex-direction': stackTablet !== '' ? (stackTablet === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackDesktop === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseTabletLandscape === true ? '-reverse' : '';
	const tabletLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletLandscape !== '' ? (stackTabletLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackTabletLandscape === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseTabletPro === true ? '-reverse' : '';
	const tabletPro = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletPro !== '' ? (stackTabletPro === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackTabletPro === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseTabletProLandscape === true ? '-reverse' : '';
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletProLandscape !== '' ? (stackTabletProLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackTabletProLandscape === true ? 'var(--gap)' : 0
		},
	};
	
	reverse = stackReverseDesktop === true ? '-reverse' : '';
	const desktop = {
		[wpBlockSelector]: {
			'flex-direction': stackDesktop !== '' ? (stackDesktop === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column:not(:first-child)']: {
			'margin-top': stackDesktop === true ? 'var(--gap)' : 0
		},
	};
	  
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;
	
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
