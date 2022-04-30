import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		widthMobile,
		widthMobileLandscape,
		widthTablet,
		widthTabletLandscape,
		widthTabletPro,
		widthTabletProLandscape,
		widthDesktop,
		
		widthMinMobile,
		widthMinMobileLandscape,
		widthMinTablet,
		widthMinTabletLandscape,
		widthMinTabletPro,
		widthMinTabletProLandscape,
		widthMinDesktop,
		
		widthMaxMobile,
		widthMaxMobileLandscape,
		widthMaxTablet,
		widthMaxTabletLandscape,
		widthMaxTabletPro,
		widthMaxTabletProLandscape,
		widthMaxDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'width':           widthMobile !== '' ? widthMobile + appendix : '',
			'min-width':       widthMinMobile !== '' ?  widthMinMobile + appendix : '',
			'max-width':       widthMaxMobile !== '' ? widthMaxMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'width':           widthMobileLandscape !== '' ? widthMobileLandscape + appendix : '',
			'min-width':       widthMinMobileLandscape !== '' ?  widthMinMobileLandscape + appendix : '',
			'max-width':       widthMaxMobileLandscape !== '' ? widthMaxMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'width':           widthTablet !== '' ? widthTablet + appendix : '',
			'min-width':       widthMinTablet !== '' ? widthMinTablet + appendix : '',
			'max-width':       widthMaxTablet !== '' ? widthMaxTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'width':           widthTabletLandscape !== '' ? widthTabletLandscape + appendix : '',
			'min-width':       widthMinTabletLandscape !== '' ? widthMinTabletLandscape + appendix : '',
			'max-width':       widthMaxTabletLandscape !== '' ? widthMaxTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'width':           widthTabletPro !== '' ? widthTabletPro + appendix : '',
			'min-width':       widthMinTabletPro !== '' ? widthMinTabletPro + appendix : '',
			'max-width':       widthMaxTabletPro !== '' ? widthMaxTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'width':           widthTabletProLandscape !== '' ? widthTabletProLandscape + appendix : '',
			'min-width':       widthMinTabletProLandscape !== '' ? widthMinTabletProLandscape + appendix : '',
			'max-width':       widthMaxTabletProLandscape !== '' ? widthMaxTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'width':           widthDesktop !== '' ? widthDesktop + appendix : '',
			'min-width':       widthMinDesktop !== '' ? widthMinDesktop + appendix : '',
			'max-width':       widthMaxDesktop !== '' ? widthMaxDesktop + appendix : '',
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
