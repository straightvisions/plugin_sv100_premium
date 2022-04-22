import {generateCSS, getBlockClassSelector,getValueWithUnit} from "../helpers";

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
			'border-top-left-radius':         borderRadiusTopLeftMobile.value !== '' ? getValueWithUnit(borderRadiusTopLeftMobile.value, borderRadiusTopLeftMobile.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightMobile.value !== '' ? getValueWithUnit(borderRadiusTopRightMobile.value, borderRadiusTopRightMobile.unit) + appendix : '',
			'border-bottom-t-radius':         borderRadiusBottomLeftMobile.value !== '' ? getValueWithUnit(borderRadiusBottomLeftMobile.value, borderRadiusBottomLeftMobile.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightMobile.value !== '' ? getValueWithUnit(borderRadiusBottomRightMobile.value, borderRadiusBottomRightMobile.unit) + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftMobileLandscape.value !== '' ? getValueWithUnit(borderRadiusTopLeftMobileLandscape.value, borderRadiusTopLeftMobileLandscape.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightMobileLandscape.value !== '' ? getValueWithUnit(borderRadiusTopRightMobileLandscape.value, borderRadiusTopRightMobileLandscape.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftMobileLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomLeftMobileLandscape.value, borderRadiusBottomLeftMobileLandscape.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightMobileLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomRightMobileLandscape.value, borderRadiusBottomRightMobileLandscape.unit) + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftTablet.value !== '' ? getValueWithUnit(borderRadiusTopLeftTablet.value, borderRadiusTopLeftTablet.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightTablet.value !== '' ? getValueWithUnit(borderRadiusTopRightTablet.value, borderRadiusTopRightTablet.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftTablet.value !== '' ? getValueWithUnit(borderRadiusBottomLeftTablet.value, borderRadiusBottomLeftTablet.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightTablet.value !== '' ? getValueWithUnit(borderRadiusBottomRightTablet.value, borderRadiusBottomRightTablet.unit) + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftTabletLandscape.value !== '' ? getValueWithUnit(borderRadiusTopLeftTabletLandscape.value, borderRadiusTopLeftTabletLandscape.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightTabletLandscape.value !== '' ? getValueWithUnit(borderRadiusTopRightTabletLandscape.value, borderRadiusTopRightTabletLandscape.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftTabletLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomLeftTabletLandscape.value, borderRadiusBottomLeftTabletLandscape.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightTabletLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomRightTabletLandscape.value, borderRadiusBottomRightTabletLandscape.unit) + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftTabletPro.value !== '' ? getValueWithUnit(borderRadiusTopLeftTabletPro.value, borderRadiusTopLeftTabletPro.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightTabletPro.value !== '' ? getValueWithUnit(borderRadiusTopRightTabletPro.value, borderRadiusTopRightTabletPro.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftTabletPro.value !== '' ? getValueWithUnit(borderRadiusBottomLeftTabletPro.value, borderRadiusBottomLeftTabletPro.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightTabletPro.value !== '' ? getValueWithUnit(borderRadiusBottomRightTabletPro.value, borderRadiusBottomRightTabletPro.unit) + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftTabletProLandscape.value !== '' ? getValueWithUnit(borderRadiusTopLeftTabletProLandscape.value, borderRadiusTopLeftTabletProLandscape.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightTabletProLandscape.value !== '' ? getValueWithUnit(borderRadiusTopRightTabletProLandscape.value, borderRadiusTopRightTabletProLandscape.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftTabletProLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomLeftTabletProLandscape.value, borderRadiusBottomLeftTabletProLandscape.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightTabletProLandscape.value !== '' ? getValueWithUnit(borderRadiusBottomRightTabletProLandscape.value, borderRadiusBottomRightTabletProLandscape.unit) + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'border-top-left-radius':         borderRadiusTopLeftDesktop.value !== '' ? getValueWithUnit(borderRadiusTopLeftDesktop.value, borderRadiusTopLeftDesktop.unit) + appendix : '',
			'border-top-right-radius':        borderRadiusTopRightDesktop.value !== '' ? getValueWithUnit(borderRadiusTopRightDesktop.value, borderRadiusTopRightDesktop.unit) + appendix : '',
			'border-bottom-left-radius':      borderRadiusBottomLeftDesktop.value !== '' ? getValueWithUnit(borderRadiusBottomLeftDesktop.value, borderRadiusBottomLeftDesktop.unit) + appendix : '',
			'border-bottom-right-radius':     borderRadiusBottomRightDesktop.value !== '' ? getValueWithUnit(borderRadiusBottomRightDesktop.value, borderRadiusBottomRightDesktop.unit) + appendix : '',
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
