import {generateCSS, getBlockClassSelector} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
		textAlignMobile,
		textAlignMobileLandscape,
		textAlignTablet,
		textAlignTabletLandscape,
		textAlignTabletPro,
		textAlignTabletProLandscape,
		textAlignDesktop,
	
	} = attr;

	// for later support of other units
	const appendix = ' !important';
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'text-align':       textAlignMobile !== '' ? textAlignMobile + appendix : '',
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'text-align':       textAlignMobileLandscape !== '' ? textAlignMobileLandscape + appendix : '',
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'text-align':       textAlignTablet !== '' ? textAlignTablet + appendix : '',
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'text-align':       textAlignTabletLandscape !== '' ? textAlignTabletLandscape + appendix : '',
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'text-align':       textAlignTabletPro !== '' ? textAlignTabletPro + appendix : '',
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'text-align':       textAlignTabletProLandscape !== '' ? textAlignTabletProLandscape + appendix : '',
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'text-align':       textAlignDesktop !== '' ? textAlignDesktop + appendix : '',
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
