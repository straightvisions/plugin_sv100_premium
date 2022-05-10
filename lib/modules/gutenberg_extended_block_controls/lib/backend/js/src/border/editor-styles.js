import {generateCSS, getBlockClassSelector, mergeCSSValuesToString} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		// border width
		borderWidthTopMobile,
		borderWidthTopMobileLandscape,
		borderWidthTopTablet,
		borderWidthTopTabletLandscape,
		borderWidthTopTabletPro,
		borderWidthTopTabletProLandscape,
		borderWidthTopDesktop,
		
		borderWidthRightMobile,
		borderWidthRightMobileLandscape,
		borderWidthRightTablet,
		borderWidthRightTabletLandscape,
		borderWidthRightTabletPro,
		borderWidthRightTabletProLandscape,
		borderWidthRightDesktop,
		
		borderWidthBottomMobile,
		borderWidthBottomMobileLandscape,
		borderWidthBottomTablet,
		borderWidthBottomTabletLandscape,
		borderWidthBottomTabletPro,
		borderWidthBottomTabletProLandscape,
		borderWidthBottomDesktop,
		
		borderWidthLeftMobile,
		borderWidthLeftMobileLandscape,
		borderWidthLeftTablet,
		borderWidthLeftTabletLandscape,
		borderWidthLeftTabletPro,
		borderWidthLeftTabletProLandscape,
		borderWidthLeftDesktop,
		
		// color
		borderColorTopMobile,
		borderColorTopMobileLandscape,
		borderColorTopTablet,
		borderColorTopTabletLandscape,
		borderColorTopTabletPro,
		borderColorTopTabletProLandscape,
		borderColorTopDesktop,
		
		borderColorRightMobile,
		borderColorRightMobileLandscape,
		borderColorRightTablet,
		borderColorRightTabletLandscape,
		borderColorRightTabletPro,
		borderColorRightTabletProLandscape,
		borderColorRightDesktop,
		
		borderColorBottomMobile,
		borderColorBottomMobileLandscape,
		borderColorBottomTablet,
		borderColorBottomTabletLandscape,
		borderColorBottomTabletPro,
		borderColorBottomTabletProLandscape,
		borderColorBottomDesktop,
		
		borderColorLeftMobile,
		borderColorLeftMobileLandscape,
		borderColorLeftTablet,
		borderColorLeftTabletLandscape,
		borderColorLeftTabletPro,
		borderColorLeftTabletProLandscape,
		borderColorLeftDesktop,
		
		// style
		borderStyleTopMobile,
		borderStyleTopMobileLandscape,
		borderStyleTopTablet,
		borderStyleTopTabletLandscape,
		borderStyleTopTabletPro,
		borderStyleTopTabletProLandscape,
		borderStyleTopDesktop,
		
		borderStyleRightMobile,
		borderStyleRightMobileLandscape,
		borderStyleRightTablet,
		borderStyleRightTabletLandscape,
		borderStyleRightTabletPro,
		borderStyleRightTabletProLandscape,
		borderStyleRightDesktop,
		
		borderStyleBottomMobile,
		borderStyleBottomMobileLandscape,
		borderStyleBottomTablet,
		borderStyleBottomTabletLandscape,
		borderStyleBottomTabletPro,
		borderStyleBottomTabletProLandscape,
		borderStyleBottomDesktop,
		
		borderStyleLeftMobile,
		borderStyleLeftMobileLandscape,
		borderStyleLeftTablet,
		borderStyleLeftTabletLandscape,
		borderStyleLeftTabletPro,
		borderStyleLeftTabletProLandscape,
		borderStyleLeftDesktop,
		
	} = attr;
	
	// for later support of other units
	const appendix = ' !important';
	// prepare css string
	let _borderTop      = mergeCSSValuesToString(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
	let _borderRight    = mergeCSSValuesToString(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
	let _borderBottom   = mergeCSSValuesToString(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
	let _borderLeft     = mergeCSSValuesToString(borderWidthTopMobile, borderStyleTopMobile, borderColorTopMobile);
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
		
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
		
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
		
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
		
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
		
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
		
		},
	};
	  
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;

	css += generateCSS(mobile, blockId, true, 'mobile');
	/*css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape');
	css += generateCSS(tablet, blockId, true, 'tablet');
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape');
	css += generateCSS(tabletPro, blockId, true, 'tabletPro');
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape');
	css += generateCSS(desktop, blockId, true, 'desktop');*/

	return css;
}

export default EditorStyles;
