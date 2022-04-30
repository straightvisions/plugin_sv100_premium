import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		heightMobile,
		heightMobileLandscape,
		heightTablet,
		heightTabletLandscape,
		heightTabletPro,
		heightTabletProLandscape,
		heightDesktop,
		
		heightMinMobile,
		heightMinMobileLandscape,
		heightMinTablet,
		heightMinTabletLandscape,
		heightMinTabletPro,
		heightMinTabletProLandscape,
		heightMinDesktop,
		
		heightMaxMobile,
		heightMaxMobileLandscape,
		heightMaxTablet,
		heightMaxTabletLandscape,
		heightMaxTabletPro,
		heightMaxTabletProLandscape,
		heightMaxDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'height':           heightMobile !== '' ? heightMobile + appendix : '',
			'min-height':       heightMinMobile !== '' ?  heightMinMobile + appendix : '',
			'max-height':       heightMaxMobile !== '' ? heightMaxMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'height':           heightMobileLandscape !== '' ? heightMobileLandscape + appendix : '',
			'min-height':       heightMinMobileLandscape !== '' ?  heightMinMobileLandscape + appendix : '',
			'max-height':       heightMaxMobileLandscape !== '' ? heightMaxMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'height':           heightTablet !== '' ? heightTablet + appendix : '',
			'min-height':       heightMinTablet !== '' ? heightMinTablet + appendix : '',
			'max-height':       heightMaxTablet !== '' ? heightMaxTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'height':           heightTabletLandscape !== '' ? heightTabletLandscape + appendix : '',
			'min-height':       heightMinTabletLandscape !== '' ? heightMinTabletLandscape + appendix : '',
			'max-height':       heightMaxTabletLandscape !== '' ? heightMaxTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'height':           heightTabletPro !== '' ? heightTabletPro + appendix : '',
			'min-height':       heightMinTabletPro !== '' ? heightMinTabletPro + appendix : '',
			'max-height':       heightMaxTabletPro !== '' ? heightMaxTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'height':           heightTabletProLandscape !== '' ? heightTabletProLandscape + appendix : '',
			'min-height':       heightMinTabletProLandscape !== '' ? heightMinTabletProLandscape + appendix : '',
			'max-height':       heightMaxTabletProLandscape !== '' ? heightMaxTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'height':           heightDesktop !== '' ? heightDesktop + appendix : '',
			'min-height':       heightMinDesktop !== '' ? heightMinDesktop + appendix : '',
			'max-height':       heightMaxDesktop !== '' ? heightMaxDesktop + appendix : '',
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
