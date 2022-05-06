import {generateCSS, getBlockClassSelector,getValueWithUnit} from "../helpers";

function EditorStyles(attr, name) {
	let wpBlockSelector = getBlockClassSelector(name, attr);
	// mod
	wpBlockSelector += ' > .wp-block-button__link';
	
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
			'padding-top':       paddingTopMobile !== '' ? paddingTopMobile + appendix : '',
			'padding-bottom':    paddingBottomMobile !== '' ? paddingBottomMobile + appendix : '',
			'padding-left':      paddingLeftMobile !== '' ? paddingLeftMobile + appendix : '',
			'padding-right':     paddingRightMobile !== '' ? paddingRightMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopMobileLandscape !== '' ? paddingTopMobileLandscape + appendix : '',
			'padding-bottom':    paddingBottomMobileLandscape !== '' ? paddingBottomMobileLandscape + appendix : '',
			'padding-left':      paddingLeftMobileLandscape !== '' ? paddingLeftMobileLandscape + appendix : '',
			'padding-right':     paddingRightMobileLandscape !== '' ? paddingRightMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTablet !== '' ? paddingTopTablet + appendix : '',
			'padding-bottom':    paddingBottomTablet !== '' ? paddingBottomTablet + appendix : '',
			'padding-left':      paddingLeftTablet !== '' ? paddingLeftTablet + appendix : '',
			'padding-right':     paddingRightTablet !== '' ? paddingRightTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletLandscape !== '' ? paddingTopTabletLandscape + appendix : '',
			'padding-bottom':    paddingBottomTabletLandscape !== '' ? paddingBottomTabletLandscape + appendix : '',
			'padding-left':      paddingLeftTabletLandscape !== '' ? paddingLeftTabletLandscape + appendix : '',
			'padding-right':     paddingRightTabletLandscape !== '' ? paddingRightTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletPro !== '' ? paddingTopTabletPro + appendix : '',
			'padding-bottom':    paddingBottomTabletPro !== '' ? paddingBottomTabletPro + appendix : '',
			'padding-left':      paddingLeftTabletPro !== '' ? paddingLeftTabletPro + appendix : '',
			'padding-right':     paddingRightTabletPro !== '' ? paddingRightTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopTabletProLandscape !== '' ? paddingTopTabletProLandscape + appendix : '',
			'padding-bottom':    paddingBottomTabletProLandscape !== '' ? paddingBottomTabletProLandscape + appendix : '',
			'padding-left':      paddingLeftTabletProLandscape !== '' ? paddingLeftTabletProLandscape + appendix : '',
			'padding-right':     paddingRightTabletProLandscape !== '' ? paddingRightTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'padding-top':       paddingTopDesktop !== '' ? paddingTopDesktop + appendix : '',
			'padding-bottom':    paddingBottomDesktop !== '' ? paddingBottomDesktop + appendix : '',
			'padding-left':      paddingLeftDesktop !== '' ? paddingLeftDesktop + appendix : '',
			'padding-right':     paddingRightDesktop !== '' ? paddingRightDesktop + appendix : '',
		},
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
