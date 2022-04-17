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
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobile !== '' ? getValueWithUnit(marginTopMobile, unit) : '',
			'margin-bottom':    marginBottomMobile !== '' ? getValueWithUnit(marginBottomMobile, unit) : '',
			'margin-left':      marginLeftMobile !== '' ? getValueWithUnit(marginLeftMobile, unit) : '',
			'margin-right':     marginRightMobile !== '' ? getValueWithUnit(marginRightMobile, unit) : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobileLandscape !== '' ? getValueWithUnit(marginTopMobileLandscape, unit) : '',
			'margin-bottom':    marginBottomMobileLandscape !== '' ? getValueWithUnit(marginBottomMobileLandscape, unit) : '',
			'margin-left':      marginLeftMobileLandscape !== '' ? getValueWithUnit(marginLeftMobileLandscape, unit) : '',
			'margin-right':     marginRightMobileLandscape !== '' ? getValueWithUnit(marginRightMobileLandscape, unit) : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTablet !== '' ? getValueWithUnit(marginTopTablet, unit) : '',
			'margin-bottom':    marginBottomTablet !== '' ? getValueWithUnit(marginBottomTablet, unit) : '',
			'margin-left':      marginLeftTablet !== '' ? getValueWithUnit(marginLeftTablet, unit) : '',
			'margin-right':     marginRightTablet !== '' ? getValueWithUnit(marginRightTablet, unit) : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletLandscape !== '' ? getValueWithUnit(marginTopTabletLandscape, unit) : '',
			'margin-bottom':    marginBottomTabletLandscape !== '' ? getValueWithUnit(marginBottomTabletLandscape, unit) : '',
			'margin-left':      marginLeftTabletLandscape !== '' ? getValueWithUnit(marginLeftTabletLandscape, unit) : '',
			'margin-right':     marginRightTabletLandscape !== '' ? getValueWithUnit(marginRightTabletLandscape, unit) : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletPro !== '' ? getValueWithUnit(marginTopTabletPro, unit) : '',
			'margin-bottom':    marginBottomTabletPro !== '' ? getValueWithUnit(marginBottomTabletPro, unit) : '',
			'margin-left':      marginLeftTabletPro !== '' ? getValueWithUnit(marginLeftTabletPro, unit) : '',
			'margin-right':     marginRightTabletPro !== '' ? getValueWithUnit(marginRightTabletPro, unit) : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletProLandscape !== '' ? getValueWithUnit(marginTopTabletProLandscape, unit) : '',
			'margin-bottom':    marginBottomTabletProLandscape !== '' ? getValueWithUnit(marginBottomTabletProLandscape, unit) : '',
			'margin-left':      marginLeftTabletProLandscape !== '' ? getValueWithUnit(marginLeftTabletProLandscape, unit) : '',
			'margin-right':     marginRightTabletProLandscape !== '' ? getValueWithUnit(marginRightTabletProLandscape, unit) : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'margin-top':       marginTopDesktop !== '' ? getValueWithUnit(marginTopDesktop, unit) : '',
			'margin-bottom':    marginBottomDesktop !== '' ? getValueWithUnit(marginBottomDesktop, unit) : '',
			'margin-left':      marginLeftDesktop !== '' ? getValueWithUnit(marginLeftDesktop, unit) : '',
			'margin-right':     marginRightDesktop !== '' ? getValueWithUnit(marginRightDesktop, unit) : '',
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
