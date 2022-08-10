import {generateCSS, getBlockClassSelector} from "../../../helpers";

function EditorStyles(attr, name) {
  const wpBlockSelector = getBlockClassSelector(name, attr);
  const wpBlockChildrenSelector = getBlockClassSelector(name, attr) + ' > *';
  // these lines are for grid matrix support later
  const children = document.querySelectorAll('.sv100-premium-block-core-'+attr.blockId + ' > *');
  const cCount = children.length;

  const {
    gridOrderMobile,
    gridOrderMobileLandscape,
    gridOrderTablet,
    gridOrderTabletLandscape,
    gridOrderTabletPro,
    gridOrderTabletProLandscape,
    gridOrderDesktop,
    
    gridOrderReverseMobile,
    gridOrderReverseMobileLandscape,
    gridOrderReverseTablet,
    gridOrderReverseTabletLandscape,
    gridOrderReverseTabletPro,
    gridOrderReverseTabletProLandscape,
    gridOrderReverseDesktop,
  } = attr;

  // selectors
  let mobile = {};
  // ORDER REVERSE-----------------------------------------------------------------------------
  if(gridOrderReverseMobile === true){
    for(let i = 0; i<cCount; i++) {
      mobile[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
      },
      mobile['.is-stacked-on-mobile'+wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = { // hot implementation for native stacked mobile
        'grid-row': (cCount - i) + '!important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      mobile[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
      }
    }
  }
  
  let mobileLandscape = {};
  if(gridOrderReverseMobileLandscape === true){
    for(let i = 0; i<cCount; i++) {
      mobileLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      mobileLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let tablet = {};
  if(gridOrderReverseTablet === true){
    for(let i = 0; i<cCount; i++) {
      tablet[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      tablet[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let tabletLandscape = {};
  if(gridOrderReverseTabletLandscape === true){
    for(let i = 0; i<cCount; i++) {
      tabletLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      tabletLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let tabletPro = {};
  if(gridOrderReverseTabletPro === true){
    for(let i = 0; i<cCount; i++) {
      tabletPro[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      tabletPro[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let tabletProLandscape = {};
  if(gridOrderReverseTabletProLandscape === true){
    for(let i = 0; i<cCount; i++) {
      tabletProLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      tabletProLandscape[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let desktop = {};
  if(gridOrderReverseDesktop === true){
    for(let i = 0; i<cCount; i++) {
      desktop[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': (cCount - i) + '!important',
        'grid-row': '1 !important',
      }
    }
  }else{
    for(let i = 0; i<cCount; i++) {
      desktop[wpBlockChildrenSelector + ':nth-child('+(i+1)+')'] = {
        'grid-column': 'revert !important',
        'grid-row': '1 !important',
      }
    }
  }
  
  let css = '';
  const blockId = `.sv100-premium-block-core-${attr.blockId}`;

  css += generateCSS(mobile, blockId, true, 'mobile', 'from', true);
  css += generateCSS(mobileLandscape, blockId, true, 'mobileLandscape', 'from', true);
  css += generateCSS(tablet, blockId, true, 'tablet', 'from', true);
  css += generateCSS(tabletLandscape, blockId, true, 'tabletLandscape', 'from', true);
  css += generateCSS(tabletPro, blockId, true, 'tabletPro', 'from', true);
  css += generateCSS(tabletProLandscape, blockId, true, 'tabletProLandscape', 'from', true);
  css += generateCSS(desktop, blockId, true, 'desktop', 'from', true);
console.log(css);
  return css;
}

export default EditorStyles;
