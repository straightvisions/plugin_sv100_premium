import {generateCSS, getBlockClassSelector} from "../../../helpers";


function EditorStyles(attr, name) {
	const wpBlockSelector = '.sv100-premium-block-core-mod-flex.wp-block-columns';
	
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
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackMobile === true ? 'auto'+appendix : '', // force flex-basis to prevent height change
		}
	};
	
	reverse = stackReverseMobileLandscape === true ? '-reverse' : '';
	const mobileLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackMobileLandscape !== '' ? (stackMobileLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackMobileLandscape === true ? 'auto'+appendix : '', // force flex-basis to prevent height change
		}
	};
	
	reverse = stackReverseTablet === true ? '-reverse' : '';
	const tablet = {
		[wpBlockSelector]: {
			'flex-direction': stackTablet !== '' ? (stackTablet === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackTablet === true ? 'auto'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletLandscape === true ? '-reverse' : '';
	const tabletLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletLandscape !== '' ? (stackTabletLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackTabletLandscape === true ? 'auto'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletPro === true ? '-reverse' : '';
	const tabletPro = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletPro !== '' ? (stackTabletPro === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackTabletPro === true ? 'auto'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseTabletProLandscape === true ? '-reverse' : '';
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'flex-direction': stackTabletProLandscape !== '' ? (stackTabletProLandscape === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackTabletProLandscape === true ? 'auto'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	
	reverse = stackReverseDesktop === true ? '-reverse' : '';
	const desktop = {
		[wpBlockSelector]: {
			'flex-direction': stackDesktop !== '' ? (stackDesktop === true ? 'column'+reverse+appendix : 'row'+reverse+appendix) : 0,
		},
		[wpBlockSelector + ' > .wp-block-column']: {
			'flex-basis': stackDesktop === true ? 'auto'+appendix : '', // force margin - regardless of theme or gutenberg defaults
		}
	};
	  
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;
	
	css += generateCSS(mobile, blockId, true, 'mobile', 'between', true);
	css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape', 'between', true);
	css += generateCSS(tablet, blockId, true, 'tablet', 'between', true);
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape', 'between', true);
	css += generateCSS(tabletPro, blockId, true, 'tabletPro', 'between', true);
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape', 'between', true);
	css += generateCSS(desktop, blockId, true, 'desktop', 'between', true);
	
	return css;
}

export default EditorStyles;
