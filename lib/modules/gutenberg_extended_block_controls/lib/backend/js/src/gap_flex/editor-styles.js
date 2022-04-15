import generateCSS from "../generateCSS";

function EditorStyles(props) {
  const wpBlockSelector = '.wp-block-columns';
  
  const {
    gapDesktop,
    gapMobile,
    gapMobileLandscape,
    gapTablet,
    gapTabletLandscape,
    gapTabletPro,
    gapTabletProLandscape,
  } = props.attributes;

  // selectors
  const mobile = {
    [wpBlockSelector]: {
      '--gap': gapMobile !== '' ? gapMobile + 'px' : 0,
      'gap': 'var(--gap)',
    },
  };
	
  const mobileLandscape = {
    [wpBlockSelector]: {
        '--gap': gapMobileLandscape !== '' ? gapMobileLandscape + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };
	
  const tablet = {
    [wpBlockSelector]: {
        '--gap': gapTablet !== '' ? gapTablet + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };
	
  const tabletLandscape = {
    [wpBlockSelector]: {
        '--gap': gapTabletLandscape !== '' ? gapTabletLandscape + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };
	
  const tabletPro = {
    [wpBlockSelector]: {
        '--gap': gapTabletPro !== '' ? gapTabletPro + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };
	
  const tabletProLandscape = {
    [wpBlockSelector]: {
        '--gap': gapTabletProLandscape !== '' ? gapTabletProLandscape + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };

  const desktop = {
    [wpBlockSelector]: {
        '--gap': gapDesktop !== '' ? gapDesktop + 'px' : 0,
	    'gap': 'var(--gap)',
    },
  };

  let css = '';
  const blockId = `.block-${props.attributes.blockId}`;

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
