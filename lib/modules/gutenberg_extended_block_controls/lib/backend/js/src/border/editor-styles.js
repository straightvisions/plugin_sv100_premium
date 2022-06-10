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
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
	_borderRight    = mergeCSSValuesToString(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopMobileLandscape, borderStyleTopMobileLandscape, borderColorTopMobileLandscape);
	const mobileLandscape = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
	_borderRight    = mergeCSSValuesToString(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopTablet, borderStyleTopTablet, borderColorTopTablet);
	const tablet = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
	_borderRight    = mergeCSSValuesToString(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopTabletLandscape, borderStyleTopTabletLandscape, borderColorTopTabletLandscape);
	const tabletLandscape = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
	_borderRight    = mergeCSSValuesToString(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopTabletPro, borderStyleTopTabletPro, borderColorTopTabletPro);
	const tabletPro = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
	_borderRight    = mergeCSSValuesToString(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopTabletProLandscape, borderStyleTopTabletProLandscape, borderColorTopTabletProLandscape);
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
		},
	};
	
	_borderTop      = mergeCSSValuesToString(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
	_borderRight    = mergeCSSValuesToString(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
	_borderBottom   = mergeCSSValuesToString(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
	_borderLeft     = mergeCSSValuesToString(borderWidthTopDesktop, borderStyleTopDesktop, borderColorTopDesktop);
	const desktop = {
		[wpBlockSelector]: {
			'border-top': typeof _borderTop !== 'undefined' ? _borderTop + appendix : '',
			'border-right': typeof _borderRight !== 'undefined' ? _borderRight + appendix : '',
			'border-bottom': typeof _borderBottom !== 'undefined' ? _borderBottom + appendix : '',
			'border-left': typeof _borderLeft !== 'undefined' ? _borderLeft + appendix : '',
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
