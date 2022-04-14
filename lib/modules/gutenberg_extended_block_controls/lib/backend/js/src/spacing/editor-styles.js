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


  const mobile_selectors = {
    [wpBlockSelector]: {
      'row-gap': rowGapMobile !== '' ? rowGapMobile + 'px' : 0,
      'column-gap': columnGapMobile !== '' ? columnGapMobile + 'px' : 0,
    },
  };
	
	const desktop_selectors = {
		[wpBlockSelector]: {
			'row-gap': rowGapMobile !== '' ? rowGapMobile + 'px' : 0,
			'column-gap': columnGapMobile !== '' ? columnGapMobile + 'px' : 0,
		},
	};

  let css = '';
  const id = `#block-${props.clientId}`;

  //css += generateCSS(tablet_selectors, id, true, "tablet");
  css += generateCSS(mobile_selectors, id, true, 'mobile');
  css += generateCSS(desktop_selectors, id, true);

  return css;
}

export default EditorStyles;
