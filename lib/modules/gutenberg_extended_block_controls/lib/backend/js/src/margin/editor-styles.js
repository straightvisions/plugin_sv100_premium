import {generateCSS, getBlockClassSelector,getValueWithUnit} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		marginTopMobile,
		marginTopMobileLandscape,
		marginTopTablet,
		marginTopTabletLandscape,
		marginTopTabletPro,
		marginTopTabletProLandscape,
		marginTopDesktop,
		
		marginBottomMobile,
		marginBottomMobileLandscape,
		marginBottomTablet,
		marginBottomTabletLandscape,
		marginBottomTabletPro,
		marginBottomTabletProLandscape,
		marginBottomDesktop,
		
		marginLeftMobile,
		marginLeftMobileLandscape,
		marginLeftTablet,
		marginLeftTabletLandscape,
		marginLeftTabletPro,
		marginLeftTabletProLandscape,
		marginLeftDesktop,
		
		marginRightMobile,
		marginRightMobileLandscape,
		marginRightTablet,
		marginRightTabletLandscape,
		marginRightTabletPro,
		marginRightTabletProLandscape,
		marginRightDesktop,
	} = attr;
	
	// for later support of other units
	const unit = 'px';
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobile !== '' ? getValueWithUnit(marginTopMobile, unit) + appendix : '',
			'margin-bottom':    marginBottomMobile !== '' ? getValueWithUnit(marginBottomMobile, unit) + appendix : '',
			'margin-left':      marginLeftMobile !== '' ? getValueWithUnit(marginLeftMobile, unit) + appendix : '',
			'margin-right':     marginRightMobile !== '' ? getValueWithUnit(marginRightMobile, unit) + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobileLandscape !== '' ? getValueWithUnit(marginTopMobileLandscape, unit) + appendix : '',
			'margin-bottom':    marginBottomMobileLandscape !== '' ? getValueWithUnit(marginBottomMobileLandscape, unit) + appendix : '',
			'margin-left':      marginLeftMobileLandscape !== '' ? getValueWithUnit(marginLeftMobileLandscape, unit) + appendix : '',
			'margin-right':     marginRightMobileLandscape !== '' ? getValueWithUnit(marginRightMobileLandscape, unit) + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTablet !== '' ? getValueWithUnit(marginTopTablet, unit) + appendix : '',
			'margin-bottom':    marginBottomTablet !== '' ? getValueWithUnit(marginBottomTablet, unit) + appendix : '',
			'margin-left':      marginLeftTablet !== '' ? getValueWithUnit(marginLeftTablet, unit) + appendix : '',
			'margin-right':     marginRightTablet !== '' ? getValueWithUnit(marginRightTablet, unit) + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletLandscape !== '' ? getValueWithUnit(marginTopTabletLandscape, unit) + appendix : '',
			'margin-bottom':    marginBottomTabletLandscape !== '' ? getValueWithUnit(marginBottomTabletLandscape, unit) + appendix : '',
			'margin-left':      marginLeftTabletLandscape !== '' ? getValueWithUnit(marginLeftTabletLandscape, unit) + appendix : '',
			'margin-right':     marginRightTabletLandscape !== '' ? getValueWithUnit(marginRightTabletLandscape, unit) + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletPro !== '' ? getValueWithUnit(marginTopTabletPro, unit) + appendix : '',
			'margin-bottom':    marginBottomTabletPro !== '' ? getValueWithUnit(marginBottomTabletPro, unit) + appendix : '',
			'margin-left':      marginLeftTabletPro !== '' ? getValueWithUnit(marginLeftTabletPro, unit) + appendix : '',
			'margin-right':     marginRightTabletPro !== '' ? getValueWithUnit(marginRightTabletPro, unit) + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletProLandscape !== '' ? getValueWithUnit(marginTopTabletProLandscape, unit) + appendix : '',
			'margin-bottom':    marginBottomTabletProLandscape !== '' ? getValueWithUnit(marginBottomTabletProLandscape, unit) + appendix : '',
			'margin-left':      marginLeftTabletProLandscape !== '' ? getValueWithUnit(marginLeftTabletProLandscape, unit) + appendix : '',
			'margin-right':     marginRightTabletProLandscape !== '' ? getValueWithUnit(marginRightTabletProLandscape, unit) + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'margin-top':       marginTopDesktop !== '' ? getValueWithUnit(marginTopDesktop, unit) + appendix : '',
			'margin-bottom':    marginBottomDesktop !== '' ? getValueWithUnit(marginBottomDesktop, unit) + appendix : '',
			'margin-left':      marginLeftDesktop !== '' ? getValueWithUnit(marginLeftDesktop, unit) + appendix : '',
			'margin-right':     marginRightDesktop !== '' ? getValueWithUnit(marginRightDesktop, unit) + appendix : '',
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
