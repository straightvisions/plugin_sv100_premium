import {generateCSS} from "../../../helpers";

function EditorStyles(attr) {
  const wpBlockSelector = '.sv100-premium-block-core-mod-flex.wp-block-columns';
  
  const {
    gapDesktop,
    gapMobile,
    gapMobileLandscape,
    gapTablet,
    gapTabletLandscape,
    gapTabletPro,
    gapTabletProLandscape,
  } = attr;

  // selectors
  const mobile = {
    [wpBlockSelector]: {
      'gap': gapMobile !== '' ? gapMobile + 'px' : 0
    },
  };
	
  const mobileLandscape = {
    [wpBlockSelector]: {
        'gap': gapMobileLandscape !== '' ? gapMobileLandscape + 'px' : 0
    },
  };
	
  const tablet = {
    [wpBlockSelector]: {
        'gap': gapTablet !== '' ? gapTablet + 'px' : 0
    },
  };
	
  const tabletLandscape = {
    [wpBlockSelector]: {
        'gap': gapTabletLandscape !== '' ? gapTabletLandscape + 'px' : 0
    },
  };
	
  const tabletPro = {
    [wpBlockSelector]: {
        'gap': gapTabletPro !== '' ? gapTabletPro + 'px' : 0,
	    
    },
  };
	
  const tabletProLandscape = {
    [wpBlockSelector]: {
        'gap': gapTabletProLandscape !== '' ? gapTabletProLandscape + 'px' : 0
    },
  };

  const desktop = {
    [wpBlockSelector]: {
        'gap': gapDesktop !== '' ? gapDesktop + 'px' : 0
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
