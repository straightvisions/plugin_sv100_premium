import {generateCSS, getBlockClassSelector,getValueWithUnit} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		borderRadiusTopLeftMobileValue,
		borderRadiusTopLeftMobileLandscapeValue,
		borderRadiusTopLeftTabletValue,
		borderRadiusTopLeftTabletLandscapeValue,
		borderRadiusTopLeftTabletProValue,
		borderRadiusTopLeftTabletProLandscapeValue,
		borderRadiusTopLeftDesktopValue,
		
		borderRadiusTopRightMobileValue,
		borderRadiusTopRightMobileLandscapeValue,
		borderRadiusTopRightTabletValue,
		borderRadiusTopRightTabletLandscapeValue,
		borderRadiusTopRightTabletProValue,
		borderRadiusTopRightTabletProLandscapeValue,
		borderRadiusTopRightDesktopValue,
		
		borderRadiusBottomLeftMobileValue,
		borderRadiusBottomLeftMobileLandscapeValue,
		borderRadiusBottomLeftTabletValue,
		borderRadiusBottomLeftTabletLandscapeValue,
		borderRadiusBottomLeftTabletProValue,
		borderRadiusBottomLeftTabletProLandscapeValue,
		borderRadiusBottomLeftDesktopValue,
		
		borderRadiusBottomRightMobileValue,
		borderRadiusBottomRightMobileLandscapeValue,
		borderRadiusBottomRightTabletValue,
		borderRadiusBottomRightTabletLandscapeValue,
		borderRadiusBottomRightTabletProValue,
		borderRadiusBottomRightTabletProLandscapeValue,
		borderRadiusBottomRightDesktopValue,
		
		borderRadiusTopLeftMobileUnit,
		borderRadiusTopLeftMobileLandscapeUnit,
		borderRadiusTopLeftTabletUnit,
		borderRadiusTopLeftTabletLandscapeUnit,
		borderRadiusTopLeftTabletProUnit,
		borderRadiusTopLeftTabletProLandscapeUnit,
		borderRadiusTopLeftDesktopUnit,
		
		borderRadiusTopRightMobileUnit,
		borderRadiusTopRightMobileLandscapeUnit,
		borderRadiusTopRightTabletUnit,
		borderRadiusTopRightTabletLandscapeUnit,
		borderRadiusTopRightTabletProUnit,
		borderRadiusTopRightTabletProLandscapeUnit,
		borderRadiusTopRightDesktopUnit,
		
		borderRadiusBottomLeftMobileUnit,
		borderRadiusBottomLeftMobileLandscapeUnit,
		borderRadiusBottomLeftTabletUnit,
		borderRadiusBottomLeftTabletLandscapeUnit,
		borderRadiusBottomLeftTabletProUnit,
		borderRadiusBottomLeftTabletProLandscapeUnit,
		borderRadiusBottomLeftDesktopUnit,
		
		borderRadiusBottomRightMobileUnit,
		borderRadiusBottomRightMobileLandscapeUnit,
		borderRadiusBottomRightTabletUnit,
		borderRadiusBottomRightTabletLandscapeUnit,
		borderRadiusBottomRightTabletProUnit,
		borderRadiusBottomRightTabletProLandscapeUnit,
		borderRadiusBottomRightDesktopUnit,
	} = attr;
	
	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftMobileValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftMobileValue, borderRadiusTopLeftMobileUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightMobileValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightMobileValue, borderRadiusTopRightMobileUnit) + appendix : '',
			'border-bottom-left-radius':         typeof borderRadiusBottomLeftMobileValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftMobileValue, borderRadiusBottomLeftMobileUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightMobileValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightMobileValue, borderRadiusBottomRightMobileUnit) + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftMobileLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftMobileLandscapeValue, borderRadiusTopLeftMobileLandscapeUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightMobileLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightMobileLandscapeValue, borderRadiusTopRightMobileLandscapeUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftMobileLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftMobileLandscapeValue, borderRadiusBottomLeftMobileLandscapeUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightMobileLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightMobileLandscapeValue, borderRadiusBottomRightMobileLandscapeUnit) + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftTabletValue, borderRadiusTopLeftTabletUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightTabletValue, borderRadiusTopRightTabletUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftTabletValue, borderRadiusBottomLeftTabletUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightTabletValue, borderRadiusBottomRightTabletUnit) + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftTabletLandscapeValue, borderRadiusTopLeftTabletLandscapeUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightTabletLandscapeValue, borderRadiusTopRightTabletLandscapeUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftTabletLandscapeValue, borderRadiusBottomLeftTabletLandscapeUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightTabletLandscapeValue, borderRadiusBottomRightTabletLandscapeUnit) + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletProValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftTabletProValue, borderRadiusTopLeftTabletProUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletProValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightTabletProValue, borderRadiusTopRightTabletProUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletProValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftTabletProValue, borderRadiusBottomLeftTabletProUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletProValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightTabletProValue, borderRadiusBottomRightTabletProUnit) + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftTabletProLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftTabletProLandscapeValue, borderRadiusTopLeftTabletProLandscapeUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightTabletProLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightTabletProLandscapeValue, borderRadiusTopRightTabletProLandscapeUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftTabletProLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftTabletProLandscapeValue, borderRadiusBottomLeftTabletProLandscapeUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightTabletProLandscapeValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightTabletProLandscapeValue, borderRadiusBottomRightTabletProLandscapeUnit) + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'border-top-left-radius':         typeof borderRadiusTopLeftDesktopValue !== 'undefined' ? getValueWithUnit(borderRadiusTopLeftDesktopValue, borderRadiusTopLeftDesktopUnit) + appendix : '',
			'border-top-right-radius':        typeof borderRadiusTopRightDesktopValue !== 'undefined' ? getValueWithUnit(borderRadiusTopRightDesktopValue, borderRadiusTopRightDesktopUnit) + appendix : '',
			'border-bottom-left-radius':      typeof borderRadiusBottomLeftDesktopValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomLeftDesktopValue, borderRadiusBottomLeftDesktopUnit) + appendix : '',
			'border-bottom-right-radius':     typeof borderRadiusBottomRightDesktopValue !== 'undefined' ? getValueWithUnit(borderRadiusBottomRightDesktopValue, borderRadiusBottomRightDesktopUnit) + appendix : '',
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
