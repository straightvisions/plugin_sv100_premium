import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		lineHeightMobile,
		lineHeightMobileLandscape,
		lineHeightTablet,
		lineHeightTabletLandscape,
		lineHeightTabletPro,
		lineHeightTabletProLandscape,
		lineHeightDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'line-height':       lineHeightMobile !== '' ? lineHeightMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'line-height':       lineHeightMobileLandscape !== '' ? lineHeightMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'line-height':       lineHeightTablet !== '' ? lineHeightTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'line-height':       lineHeightTabletLandscape !== '' ? lineHeightTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'line-height':       lineHeightTabletPro !== '' ? lineHeightTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'line-height':       lineHeightTabletProLandscape !== '' ? lineHeightTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'line-height':       lineHeightDesktop !== '' ? lineHeightDesktop + appendix : '',
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
