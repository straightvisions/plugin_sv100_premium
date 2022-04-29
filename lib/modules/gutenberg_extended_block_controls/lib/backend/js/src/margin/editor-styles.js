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
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobile !== '' ? marginTopMobile + appendix : '',
			'margin-bottom':    marginBottomMobile !== '' ? marginBottomMobile + appendix : '',
			'margin-left':      marginLeftMobile !== '' ? marginLeftMobile + appendix : '',
			'margin-right':     marginRightMobile !== '' ? marginRightMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopMobileLandscape !== '' ? marginTopMobileLandscape + appendix : '',
			'margin-bottom':    marginBottomMobileLandscape !== '' ? marginBottomMobileLandscape + appendix : '',
			'margin-left':      marginLeftMobileLandscape !== '' ? marginLeftMobileLandscape + appendix : '',
			'margin-right':     marginRightMobileLandscape !== '' ? marginRightMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTablet !== '' ? marginTopTablet + appendix : '',
			'margin-bottom':    marginBottomTablet !== '' ? marginBottomTablet + appendix : '',
			'margin-left':      marginLeftTablet !== '' ? marginLeftTablet + appendix : '',
			'margin-right':     marginRightTablet !== '' ? marginRightTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletLandscape !== '' ? marginTopTabletLandscape + appendix : '',
			'margin-bottom':    marginBottomTabletLandscape !== '' ? marginBottomTabletLandscape + appendix : '',
			'margin-left':      marginLeftTabletLandscape !== '' ? marginLeftTabletLandscape + appendix : '',
			'margin-right':     marginRightTabletLandscape !== '' ? marginRightTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletPro !== '' ? marginTopTabletPro + appendix : '',
			'margin-bottom':    marginBottomTabletPro !== '' ? marginBottomTabletPro + appendix : '',
			'margin-left':      marginLeftTabletPro !== '' ? marginLeftTabletPro + appendix : '',
			'margin-right':     marginRightTabletPro !== '' ? marginRightTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'margin-top':       marginTopTabletProLandscape !== '' ? marginTopTabletProLandscape + appendix : '',
			'margin-bottom':    marginBottomTabletProLandscape !== '' ? marginBottomTabletProLandscape + appendix : '',
			'margin-left':      marginLeftTabletProLandscape !== '' ? marginLeftTabletProLandscape + appendix : '',
			'margin-right':     marginRightTabletProLandscape !== '' ? marginRightTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'margin-top':       marginTopDesktop !== '' ? marginTopDesktop + appendix : '',
			'margin-bottom':    marginBottomDesktop !== '' ? marginBottomDesktop + appendix : '',
			'margin-left':      marginLeftDesktop !== '' ? marginLeftDesktop + appendix : '',
			'margin-right':     marginRightDesktop !== '' ? marginRightDesktop + appendix : '',
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
