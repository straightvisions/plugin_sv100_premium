import {generateCSS, getBlockClassSelector} from "../../../helpers";

function EditorStyles(attr, name) {
  const wpBlockSelector = getBlockClassSelector(name, attr);
  console.log(wpBlockSelector);
  const {
    gridGapMobile,
    gridGapMobileLandscape,
    gridGapTablet,
    gridGapTabletLandscape,
    gridGapTabletPro,
    gridGapTabletProLandscape,
    gridGapDesktop,
  } = attr;
  console.log(attr);
  // selectors
  const mobile = {
    [wpBlockSelector]: {
      'display': 'grid !important', // init grid display
      'gap': gridGapMobile !== '' ? gridGapMobile + 'px' : 0,
    },
  };
  
  const mobileLandscape = {
    [wpBlockSelector]: {
      'gap': gridGapMobileLandscape !== '' ? gridGapMobileLandscape + 'px' : 0,
      
    },
  };
  
  const tablet = {
    [wpBlockSelector]: {
      'gap': gridGapTablet !== '' ? gridGapTablet + 'px' : 0,
    },
  };
  
  const tabletLandscape = {
    [wpBlockSelector]: {
      'gap': gridGapTabletLandscape !== '' ? gridGapTabletLandscape + 'px' : 0,
    },
  };
  
  const tabletPro = {
    [wpBlockSelector]: {
      'gap': gridGapTabletPro !== '' ? gridGapTabletPro + 'px' : 0,
    },
  };
  
  const tabletProLandscape = {
    [wpBlockSelector]: {
      'gap': gridGapTabletProLandscape !== '' ? gridGapTabletProLandscape + 'px' : 0,
    },
  };
  
  const desktop = {
    [wpBlockSelector]: {
      'gap': gridGapDesktop !== '' ? gridGapDesktop + 'px' : 0,
    },
  };
  
  let css = '';
  const blockId = `.sv100-premium-block-core-${attr.blockId}`;
  console.log('gapGrid');
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
