import {generateCSS} from "../../../helpers";

function EditorStyles(attr) {
	const wpBlockSelector = '.sv100-premium-block-core-mod-flex.wp-block-columns';
	
	const {
		alignDesktop,
		alignMobile,
		alignMobileLandscape,
		alignTablet,
		alignTabletLandscape,
		alignTabletPro,
		alignTabletProLandscape,
	} = attr;
	
	const appendix = ' !important';
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'align-items': alignMobile + appendix,
		},
	};
	
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'align-items': alignMobileLandscape + appendix,
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'align-items': alignTablet + appendix,
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'align-items': alignTabletLandscape + appendix,
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'align-items': alignTabletPro + appendix,
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'align-items': alignTabletProLandscape + appendix,
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'align-items': alignDesktop + appendix,
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
