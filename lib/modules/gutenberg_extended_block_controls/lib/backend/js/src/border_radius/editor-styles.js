import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		borderRadiusTopLeftMobile,
		borderRadiusTopLeftMobileLandscape,
		borderRadiusTopLeftTablet,
		borderRadiusTopLeftTabletLandscape,
		borderRadiusTopLeftTabletPro,
		borderRadiusTopLeftTabletProLandscape,
		borderRadiusTopLeftDesktop,
		
		borderRadiusTopRightMobile,
		borderRadiusTopRightMobileLandscape,
		borderRadiusTopRightTablet,
		borderRadiusTopRightTabletLandscape,
		borderRadiusTopRightTabletPro,
		borderRadiusTopRightTabletProLandscape,
		borderRadiusTopRightDesktop,
		
		borderRadiusBottomLeftMobile,
		borderRadiusBottomLeftMobileLandscape,
		borderRadiusBottomLeftTablet,
		borderRadiusBottomLeftTabletLandscape,
		borderRadiusBottomLeftTabletPro,
		borderRadiusBottomLeftTabletProLandscape,
		borderRadiusBottomLeftDesktop,
		
		borderRadiusBottomRightMobile,
		borderRadiusBottomRightMobileLandscape,
		borderRadiusBottomRightTablet,
		borderRadiusBottomRightTabletLandscape,
		borderRadiusBottomRightTabletPro,
		borderRadiusBottomRightTabletProLandscape,
		borderRadiusBottomRightDesktop,
		
	} = attr;
	
	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftMobile !== 'undefined' ? borderRadiusTopLeftMobile + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightMobile !== 'undefined' ? borderRadiusTopRightMobile + appendix : '',
			'border-bottom-left-radius':         typeof borderRadiusBottomLeftMobile !== 'undefined' ? borderRadiusBottomLeftMobile + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightMobile !== 'undefined' ? borderRadiusBottomRightMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftMobileLandscape !== 'undefined' ? borderRadiusTopLeftMobileLandscape + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightMobileLandscape !== 'undefined' ? borderRadiusTopRightMobileLandscape + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftMobileLandscape !== 'undefined' ? borderRadiusBottomLeftMobileLandscape + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightMobileLandscape !== 'undefined' ? borderRadiusBottomRightMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTablet !== 'undefined' ? borderRadiusTopLeftTablet + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTablet !== 'undefined' ? borderRadiusTopRightTablet + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTablet !== 'undefined' ? borderRadiusBottomLeftTablet + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTablet !== 'undefined' ? borderRadiusBottomRightTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletLandscape !== 'undefined' ? borderRadiusTopLeftTabletLandscape + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletLandscape !== 'undefined' ? borderRadiusTopRightTabletLandscape + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletLandscape !== 'undefined' ? borderRadiusBottomLeftTabletLandscape + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletLandscape !== 'undefined' ? borderRadiusBottomRightTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletPro !== 'undefined' ? borderRadiusTopLeftTabletPro + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletPro !== 'undefined' ? borderRadiusTopRightTabletPro + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletPro !== 'undefined' ? borderRadiusBottomLeftTabletPro + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletPro !== 'undefined' ? borderRadiusBottomRightTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletProLandscape !== 'undefined' ? borderRadiusTopLeftTabletProLandscape + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletProLandscape !== 'undefined' ? borderRadiusTopRightTabletProLandscape + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletProLandscape !== 'undefined' ? borderRadiusBottomLeftTabletProLandscape + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletProLandscape !== 'undefined' ? borderRadiusBottomRightTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftDesktop !== 'undefined' ? borderRadiusTopLeftDesktop + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightDesktop !== 'undefined' ? borderRadiusTopRightDesktop + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftDesktop !== 'undefined' ? borderRadiusBottomLeftDesktop + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightDesktop !== 'undefined' ? borderRadiusBottomRightDesktop + appendix : '',
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
