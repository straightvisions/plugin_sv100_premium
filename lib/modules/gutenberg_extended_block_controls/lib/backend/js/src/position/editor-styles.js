import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	let wpBlockSelector = getBlockClassSelector(name, attr) + ':not(.block-editor-block-list__block)';
	//const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		positionMobile,
		positionMobileLandscape,
		positionTablet,
		positionTabletLandscape,
		positionTabletPro,
		positionTabletProLandscape,
		positionDesktop,
		
		positionTopMobile,
		positionTopMobileLandscape,
		positionTopTablet,
		positionTopTabletLandscape,
		positionTopTabletPro,
		positionTopTabletProLandscape,
		positionTopDesktop,
		
		positionBottomMobile,
		positionBottomMobileLandscape,
		positionBottomTablet,
		positionBottomTabletLandscape,
		positionBottomTabletPro,
		positionBottomTabletProLandscape,
		positionBottomDesktop,
		
		positionLeftMobile,
		positionLeftMobileLandscape,
		positionLeftTablet,
		positionLeftTabletLandscape,
		positionLeftTabletPro,
		positionLeftTabletProLandscape,
		positionLeftDesktop,
		
		positionRightMobile,
		positionRightMobileLandscape,
		positionRightTablet,
		positionRightTabletLandscape,
		positionRightTabletPro,
		positionRightTabletProLandscape,
		positionRightDesktop,
		
		positionZindexMobile,
		positionZindexMobileLandscape,
		positionZindexTablet,
		positionZindexTabletLandscape,
		positionZindexTabletPro,
		positionZindexTabletProLandscape,
		positionZindexDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'position':     positionMobile !== '' ? positionMobile + appendix : '',
			'top':          positionTopMobile !== '' ? positionTopMobile + appendix : '',
			'bottom':       positionBottomMobile !== '' ? positionBottomMobile + appendix : '',
			'left':         positionLeftMobile !== '' ? positionLeftMobile + appendix : '',
			'right':        positionRightMobile !== '' ? positionRightMobile + appendix : '',
			'z-index':      positionZindexMobile !== '' ? positionZindexMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'position':     positionMobileLandscape !== '' ? positionMobileLandscape + appendix : '',
			'top':          positionTopMobileLandscape !== '' ? positionTopMobileLandscape + appendix : '',
			'bottom':       positionBottomMobileLandscape !== '' ? positionBottomMobileLandscape + appendix : '',
			'left':         positionLeftMobileLandscape !== '' ? positionLeftMobileLandscape + appendix : '',
			'right':        positionRightMobileLandscape !== '' ? positionRightMobileLandscape + appendix : '',
			'z-index':      positionZindexMobileLandscape !== '' ? positionZindexMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'position':     positionTablet !== '' ? positionTablet + appendix : '',
			'top':          positionTopTablet !== '' ? positionTopTablet + appendix : '',
			'bottom':       positionBottomTablet !== '' ? positionBottomTablet + appendix : '',
			'left':         positionLeftTablet !== '' ? positionLeftTablet + appendix : '',
			'right':        positionRightTablet !== '' ? positionRightTablet + appendix : '',
			'z-index':      positionZindexTablet !== '' ? positionZindexTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'position':     positionTabletLandscape !== '' ? positionTabletLandscape + appendix : '',
			'top':          positionTopTabletLandscape !== '' ? positionTopTabletLandscape + appendix : '',
			'bottom':       positionBottomTabletLandscape !== '' ? positionBottomTabletLandscape + appendix : '',
			'left':         positionLeftTabletLandscape !== '' ? positionLeftTabletLandscape + appendix : '',
			'right':        positionRightTabletLandscape !== '' ? positionRightTabletLandscape + appendix : '',
			'z-index':      positionZindexTabletLandscape !== '' ? positionZindexTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'position':     positionTabletPro !== '' ? positionTabletPro + appendix : '',
			'top':          positionTopTabletPro !== '' ? positionTopTabletPro + appendix : '',
			'bottom':       positionBottomTabletPro !== '' ? positionBottomTabletPro + appendix : '',
			'left':         positionLeftTabletPro !== '' ? positionLeftTabletPro + appendix : '',
			'right':        positionRightTabletPro !== '' ? positionRightTabletPro + appendix : '',
			'z-index':      positionZindexTabletPro !== '' ? positionZindexTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'position':     positionTabletProLandscape !== '' ? positionTabletProLandscape + appendix : '',
			'top':          positionTopTabletProLandscape !== '' ? positionTopTabletProLandscape + appendix : '',
			'bottom':       positionBottomTabletProLandscape !== '' ? positionBottomTabletProLandscape + appendix : '',
			'left':         positionLeftTabletProLandscape !== '' ? positionLeftTabletProLandscape + appendix : '',
			'right':        positionRightTabletProLandscape !== '' ? positionRightTabletProLandscape + appendix : '',
			'z-index':      positionZindexTabletProLandscape !== '' ? positionZindexTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'position':     positionDesktop !== '' ? positionDesktop + appendix : '',
			'top':          positionTopDesktop !== '' ? positionTopDesktop + appendix : '',
			'bottom':       positionBottomDesktop !== '' ? positionBottomDesktop + appendix : '',
			'left':         positionLeftDesktop !== '' ? positionLeftDesktop + appendix : '',
			'right':        positionRightDesktop !== '' ? positionRightDesktop + appendix : '',
			'z-index':      positionZindexDesktop !== '' ? positionZindexDesktop + appendix : '',
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
