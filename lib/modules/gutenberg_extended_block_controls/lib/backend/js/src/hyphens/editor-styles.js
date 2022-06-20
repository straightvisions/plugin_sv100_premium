import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		hyphensMobile,
		hyphensMobileLandscape,
		hyphensTablet,
		hyphensTabletLandscape,
		hyphensTabletPro,
		hyphensTabletProLandscape,
		hyphensDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'hyphens':       hyphensMobile !== '' ? hyphensMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'hyphens':       hyphensMobileLandscape !== '' ? hyphensMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'hyphens':       hyphensTablet !== '' ? hyphensTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'hyphens':       hyphensTabletLandscape !== '' ? hyphensTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'hyphens':       hyphensTabletPro !== '' ? hyphensTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'hyphens':       hyphensTabletProLandscape !== '' ? hyphensTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'hyphens':       hyphensDesktop !== '' ? hyphensDesktop + appendix : '',
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
