import {generateCSS} from "../../../helpers";

function EditorStyles(attr) {
	const wpBlockSelector = '.sv100-premium-block-core-mod-flex.wp-block-columns';
	
	const {
		wrapFlexMobile,
		wrapFlexMobileLandscape,
		wrapFlexTablet,
		wrapFlexTabletLandscape,
		wrapFlexTabletPro,
		wrapFlexTabletProLandscape,
		wrapFlexDesktop,
	} = attr;
	
	const appendix = ' !important';
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexMobile + appendix,
		},
	};
	
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexMobileLandscape + appendix,
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexTablet + appendix,
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexTabletLandscape + appendix,
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexTabletPro + appendix,
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexTabletProLandscape + appendix,
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'flex-wrap': wrapFlexDesktop + appendix,
		},
	};

	
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;
	
	css += generateCSS(mobile, blockId, true, 'mobile', 'from');
	css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape');
	css += generateCSS(tablet, blockId, true, 'tablet');
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape');
	css += generateCSS(tabletPro, blockId, true, 'tabletPro');
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape');
	css += generateCSS(desktop, blockId, true, 'desktop');

	return css;
}

export default EditorStyles;
