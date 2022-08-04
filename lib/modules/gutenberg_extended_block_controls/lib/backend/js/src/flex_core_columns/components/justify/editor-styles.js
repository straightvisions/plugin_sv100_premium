import {generateCSS} from "../../../helpers";

function EditorStyles(attr) {
	const wpBlockSelector = '.sv100-premium-block-core-mod-flex.wp-block-columns';
	
	const {
		justifyDesktop,
		justifyMobile,
		justifyMobileLandscape,
		justifyTablet,
		justifyTabletLandscape,
		justifyTabletPro,
		justifyTabletProLandscape,
	} = attr;
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'justify-content': justifyMobile,
		},
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'justify-content': justifyMobileLandscape,
		},
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'justify-content': justifyTablet,
		},
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'justify-content': justifyTabletLandscape,
		},
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'justify-content': justifyTabletPro,
		},
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'justify-content': justifyTabletProLandscape,
		},
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'justify-content': justifyDesktop,
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
