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
			'display': stackMobile === true ? 'flex'+appendix : '', // force flex - regardless of theme or gutenberg defaults
			'flex-direction': stackMobile !== '' ? (stackMobile === true ? 'column'+reverse+' !important' : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackMobile === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackMobile === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseMobileLandscape === true ? '-reverse' : '';
	const mobileLandscape = {
		[wpBlockSelector]: {
			'display': stackMobileLandscape === true ? 'flex'+appendix : '',
			'flex-direction': stackMobileLandscape !== '' ? (stackMobileLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackMobileLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackMobileLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTablet === true ? '-reverse' : '';
	const tablet = {
		[wpBlockSelector]: {
			'display': stackTablet === true ? 'flex'+appendix : '',
			'flex-direction': stackTablet !== '' ? (stackTablet === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackTablet === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackTablet === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletLandscape === true ? '-reverse' : '';
	const tabletLandscape = {
		[wpBlockSelector]: {
			'display': stackTabletLandscape === true ? 'flex'+appendix : '',
			'flex-direction': stackTabletLandscape !== '' ? (stackTabletLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackTabletLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackTabletLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletPro === true ? '-reverse' : '';
	const tabletPro = {
		[wpBlockSelector]: {
			'display': stackTabletPro === true ? 'flex'+appendix : '',
			'flex-direction': stackTabletPro !== '' ? (stackTabletPro === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackTabletPro === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackTabletPro === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletProLandscape === true ? '-reverse' : '';
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'display': stackTabletProLandscape === true ? 'flex'+appendix : '',
			'flex-direction': stackTabletProLandscape !== '' ? (stackTabletProLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackTabletProLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackTabletProLandscape === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseDesktop === true ? '-reverse' : '';
	const desktop = {
		[wpBlockSelector]: {
			'display': stackDesktop === true ? 'flex'+appendix : '',
			'flex-direction': stackDesktop !== '' ? (stackDesktop === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'margin-left': stackDesktop === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
			'margin-right': stackDesktop === true ? '0'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	  
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;
	
	css += generateCSS(mobile, blockId, true, 'mobile', 'from', true);
	css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape', 'from', true);
	css += generateCSS(tablet, blockId, true, 'tablet', 'from', true);
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape', 'from', true);
	css += generateCSS(tabletPro, blockId, true, 'tabletPro', 'from', true);
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape', 'from', true);
	css += generateCSS(desktop, blockId, true, 'desktop', 'from', true);
	
	return css;
}

export default EditorStyles;
