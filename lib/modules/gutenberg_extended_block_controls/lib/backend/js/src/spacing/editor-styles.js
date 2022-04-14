/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../generateCSS";

function EditorStyles(props) {
  const wpBlockSelector = '.wp-block-columns';
  
  const {
    columnGapDesktop,
    columnGapMobile,
    columnGapMobileLandscape,
    columnGapTablet,
    columnGapTabletLandscape,
    columnGapTabletPro,
    columnGapTabletProLandscape,
    rowGapDesktop,
    rowGapMobile,
    rowGapMobileLandscape,
    rowGapTablet,
    rowGapTabletLandscape,
    rowGapTabletPro,
    rowGapTabletProLandscape,
  } = props.attributes;

  // selectors
  const mobile = {
    [wpBlockSelector]: {
      'row-gap': rowGapMobile !== '' ? rowGapMobile + 'px' : 0,
      'column-gap': columnGapMobile !== '' ? columnGapMobile + 'px' : 0,
    },
  };
	
  const mobileLandscape = {
    [wpBlockSelector]: {
        'row-gap': rowGapMobileLandscape !== '' ? rowGapMobileLandscape + 'px' : 0,
        'column-gap': columnGapMobileLandscape !== '' ? columnGapMobileLandscape + 'px' : 0,
    },
  };
	
  const tablet = {
    [wpBlockSelector]: {
        'row-gap': rowGapTablet !== '' ? rowGapTablet + 'px' : 0,
        'column-gap': columnGapTablet !== '' ? columnGapTablet + 'px' : 0,
    },
  };
	
  const tabletLandscape = {
    [wpBlockSelector]: {
        'row-gap': rowGapTabletLandscape !== '' ? rowGapTabletLandscape + 'px' : 0,
        'column-gap': columnGapTabletLandscape !== '' ? columnGapTabletLandscape + 'px' : 0,
    },
  };
	
  const tabletPro = {
    [wpBlockSelector]: {
        'row-gap': rowGapTabletPro !== '' ? rowGapTabletPro + 'px' : 0,
        'column-gap': columnGapTabletPro !== '' ? columnGapTabletPro + 'px' : 0,
    },
  };
	
  const tabletProLandscape = {
    [wpBlockSelector]: {
        'row-gap': rowGapTabletProLandscape !== '' ? rowGapTabletProLandscape + 'px' : 0,
        'column-gap': columnGapTabletProLandscape !== '' ? columnGapTabletProLandscape + 'px' : 0,
    },
  };

  const desktop = {
    [wpBlockSelector]: {
        'row-gap': rowGapDesktop !== '' ? rowGapDesktop + 'px' : 0,
        'column-gap': columnGapDesktop !== '' ? columnGapDesktop + 'px' : 0,
    },
  };

  let css = '';
  const blockId = `#block-${props.clientId}`;

  css += generateCSS(mobile, blockId, true, 'mobile');
  css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape');
  css += generateCSS(tablet, blockId, true, 'tablet');
  css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape');
  css += generateCSS(tabletPro, blockId, true, 'tabletPro');
  css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape');
  css += generateCSS(desktop, blockId, true);

  return css;
}

export default EditorStyles;
