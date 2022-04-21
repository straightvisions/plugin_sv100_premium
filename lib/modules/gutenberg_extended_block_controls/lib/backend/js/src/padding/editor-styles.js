import {generateCSS, getBlockClassSelector,getValueWithUnit} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		paddingTopMobile,
		paddingTopMobileLandscape,
		paddingTopTablet,
		paddingTopTabletLandscape,
		paddingTopTabletPro,
		paddingTopTabletProLandscape,
		paddingTopDesktop,
		
		paddingBottomMobile,
		paddingBottomMobileLandscape,
		paddingBottomTablet,
		paddingBottomTabletLandscape,
		paddingBottomTabletPro,
		paddingBottomTabletProLandscape,
		paddingBottomDesktop,
		
		paddingLeftMobile,
		paddingLeftMobileLandscape,
		paddingLeftTablet,
		paddingLeftTabletLandscape,
		paddingLeftTabletPro,
		paddingLeftTabletProLandscape,
		paddingLeftDesktop,
		
		paddingRightMobile,
		paddingRightMobileLandscape,
		paddingRightTablet,
		paddingRightTabletLandscape,
		paddingRightTabletPro,
		paddingRightTabletProLandscape,
		paddingRightDesktop,
	} = attr;
	
	// for later support of other units
	const unit = 'px';
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopMobile !== '' ? getValueWithUnit(paddingTopMobile, unit) + appendix : '',
			'padding-bottom':    paddingBottomMobile !== '' ? getValueWithUnit(paddingBottomMobile, unit) + appendix : '',
			'padding-left':      paddingLeftMobile !== '' ? getValueWithUnit(paddingLeftMobile, unit) + appendix : '',
			'padding-right':     paddingRightMobile !== '' ? getValueWithUnit(paddingRightMobile, unit) + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopMobileLandscape !== '' ? getValueWithUnit(paddingTopMobileLandscape, unit) + appendix : '',
			'padding-bottom':    paddingBottomMobileLandscape !== '' ? getValueWithUnit(paddingBottomMobileLandscape, unit) + appendix : '',
			'padding-left':      paddingLeftMobileLandscape !== '' ? getValueWithUnit(paddingLeftMobileLandscape, unit) + appendix : '',
			'padding-right':     paddingRightMobileLandscape !== '' ? getValueWithUnit(paddingRightMobileLandscape, unit) + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTablet !== '' ? getValueWithUnit(paddingTopTablet, unit) + appendix : '',
			'padding-bottom':    paddingBottomTablet !== '' ? getValueWithUnit(paddingBottomTablet, unit) + appendix : '',
			'padding-left':      paddingLeftTablet !== '' ? getValueWithUnit(paddingLeftTablet, unit) + appendix : '',
			'padding-right':     paddingRightTablet !== '' ? getValueWithUnit(paddingRightTablet, unit) + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletLandscape !== '' ? getValueWithUnit(paddingTopTabletLandscape, unit) + appendix : '',
			'padding-bottom':    paddingBottomTabletLandscape !== '' ? getValueWithUnit(paddingBottomTabletLandscape, unit) + appendix : '',
			'padding-left':      paddingLeftTabletLandscape !== '' ? getValueWithUnit(paddingLeftTabletLandscape, unit) + appendix : '',
			'padding-right':     paddingRightTabletLandscape !== '' ? getValueWithUnit(paddingRightTabletLandscape, unit) + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletPro !== '' ? getValueWithUnit(paddingTopTabletPro, unit) + appendix : '',
			'padding-bottom':    paddingBottomTabletPro !== '' ? getValueWithUnit(paddingBottomTabletPro, unit) + appendix : '',
			'padding-left':      paddingLeftTabletPro !== '' ? getValueWithUnit(paddingLeftTabletPro, unit) + appendix : '',
			'padding-right':     paddingRightTabletPro !== '' ? getValueWithUnit(paddingRightTabletPro, unit) + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletProLandscape !== '' ? getValueWithUnit(paddingTopTabletProLandscape, unit) + appendix : '',
			'padding-bottom':    paddingBottomTabletProLandscape !== '' ? getValueWithUnit(paddingBottomTabletProLandscape, unit) + appendix : '',
			'padding-left':      paddingLeftTabletProLandscape !== '' ? getValueWithUnit(paddingLeftTabletProLandscape, unit) + appendix : '',
			'padding-right':     paddingRightTabletProLandscape !== '' ? getValueWithUnit(paddingRightTabletProLandscape, unit) + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopDesktop !== '' ? getValueWithUnit(paddingTopDesktop, unit) + appendix : '',
			'padding-bottom':    paddingBottomDesktop !== '' ? getValueWithUnit(paddingBottomDesktop, unit) + appendix : '',
			'padding-left':      paddingLeftDesktop !== '' ? getValueWithUnit(paddingLeftDesktop, unit) + appendix : '',
			'padding-right':     paddingRightDesktop !== '' ? getValueWithUnit(paddingRightDesktop, unit) + appendix : '',
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
