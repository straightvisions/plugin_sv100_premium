import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		fontSizeMobile,
		fontSizeMobileLandscape,
		fontSizeTablet,
		fontSizeTabletLandscape,
		fontSizeTabletPro,
		fontSizeTabletProLandscape,
		fontSizeDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'font-size':       fontSizeMobile !== '' ? fontSizeMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'font-size':       fontSizeMobileLandscape !== '' ? fontSizeMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'font-size':       fontSizeTablet !== '' ? fontSizeTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'font-size':       fontSizeTabletLandscape !== '' ? fontSizeTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'font-size':       fontSizeTabletPro !== '' ? fontSizeTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'font-size':       fontSizeTabletProLandscape !== '' ? fontSizeTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'font-size':       fontSizeDesktop !== '' ? fontSizeDesktop + appendix : '',
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
