import {generateCSS, getBlockClassSelector} from "../helpers";


function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);
	
	const {
	hideDesktop,
	hideMobile,
	hideMobileLandscape,
	hideTablet,
	hideTabletLandscape,
	hideTabletPro,
	hideTabletProLandscape,
	} = attr;
	
	const appendix = ' !important';
	
	// selectors
	const mobile = {
		[wpBlockSelector]: {
		  'display': hideMobile === true ? 'none' + appendix : '',
		}
	};
	
	const mobileLandscape = {
		[wpBlockSelector]: {
			'display': hideMobileLandscape === true ? 'none' + appendix : '',
		}
	};
	
	const tablet = {
		[wpBlockSelector]: {
			'display': hideTablet === true ? 'none' + appendix : '',
		}
	};
	
	const tabletLandscape = {
		[wpBlockSelector]: {
			'display': hideTabletLandscape === true ? 'none' + appendix : '',
		}
	};
	
	const tabletPro = {
		[wpBlockSelector]: {
			'display': hideTabletPro === true ? 'none' + appendix : '',
		}
	};
	
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'display': hideTabletProLandscape === true ? 'none' + appendix : '',
		}
	};
	
	const desktop = {
		[wpBlockSelector]: {
			'display': hideDesktop === true ? 'none' + appendix : '',
		}
	};
	  
	let css = '';
	const blockId = `.sv100-premium-block-core-${attr.blockId}`;
	
	css += generateCSS(mobile, blockId, true, 'mobile', 'between');
	css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape', 'between');
	css += generateCSS(tablet, blockId, true, 'tablet', 'between');
	css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape', 'between');
	css += generateCSS(tabletPro, blockId, true, 'tabletPro', 'between');
	css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape', 'between');
	css += generateCSS(desktop, blockId, true, 'desktop', 'between');

	return css;
}

export default EditorStyles;
