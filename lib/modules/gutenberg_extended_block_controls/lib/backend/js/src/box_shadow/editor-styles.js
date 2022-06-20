import {generateCSS, getBlockClassSelector, mergeCSSValuesToString} from "../helpers";

function EditorStyles(attr, name) {
	const wpBlockSelector = getBlockClassSelector(name, attr);

	let {
		// boxShadow type
		boxShadowType1Mobile                 ,
		boxShadowType1MobileLandscape        ,
		boxShadowType1Tablet                 ,
		boxShadowType1TabletLandscape        ,
		boxShadowType1TabletPro              ,
		boxShadowType1TabletProLandscape     ,
		boxShadowType1Desktop                ,
		
		// boxShadow offset x
		boxShadowOffsetX1Mobile                 ,
		boxShadowOffsetX1MobileLandscape        ,
		boxShadowOffsetX1Tablet                 ,
		boxShadowOffsetX1TabletLandscape        ,
		boxShadowOffsetX1TabletPro              ,
		boxShadowOffsetX1TabletProLandscape     ,
		boxShadowOffsetX1Desktop                ,
		
		// boxShadow offset y
		boxShadowOffsetY1Mobile                 ,
		boxShadowOffsetY1MobileLandscape        ,
		boxShadowOffsetY1Tablet                 ,
		boxShadowOffsetY1TabletLandscape        ,
		boxShadowOffsetY1TabletPro              ,
		boxShadowOffsetY1TabletProLandscape     ,
		boxShadowOffsetY1Desktop                ,
		
		// blur radius
		boxShadowBlur1Mobile                 ,
		boxShadowBlur1MobileLandscape        ,
		boxShadowBlur1Tablet                 ,
		boxShadowBlur1TabletLandscape        ,
		boxShadowBlur1TabletPro              ,
		boxShadowBlur1TabletProLandscape     ,
		boxShadowBlur1Desktop                ,
		
		// spread radius
		boxShadowSpread1Mobile                 ,
		boxShadowSpread1MobileLandscape        ,
		boxShadowSpread1Tablet                 ,
		boxShadowSpread1TabletLandscape        ,
		boxShadowSpread1TabletPro              ,
		boxShadowSpread1TabletProLandscape     ,
		boxShadowSpread1Desktop                ,
		
		// color
		boxShadowColor1Mobile                 ,
		boxShadowColor1MobileLandscape        ,
		boxShadowColor1Tablet                 ,
		boxShadowColor1TabletLandscape        ,
		boxShadowColor1TabletPro              ,
		boxShadowColor1TabletProLandscape     ,
		boxShadowColor1Desktop                ,
		
		// ------- 2nd shadow
		// boxShadow type
		boxShadowType2Mobile                 ,
		boxShadowType2MobileLandscape        ,
		boxShadowType2Tablet                 ,
		boxShadowType2TabletLandscape        ,
		boxShadowType2TabletPro              ,
		boxShadowType2TabletProLandscape     ,
		boxShadowType2Desktop                ,
		
		// boxShadow offset x
		boxShadowOffsetX2Mobile                 ,
		boxShadowOffsetX2MobileLandscape        ,
		boxShadowOffsetX2Tablet                 ,
		boxShadowOffsetX2TabletLandscape        ,
		boxShadowOffsetX2TabletPro              ,
		boxShadowOffsetX2TabletProLandscape     ,
		boxShadowOffsetX2Desktop                ,
		
		// boxShadow offset y
		boxShadowOffsetY2Mobile                 ,
		boxShadowOffsetY2MobileLandscape        ,
		boxShadowOffsetY2Tablet                 ,
		boxShadowOffsetY2TabletLandscape        ,
		boxShadowOffsetY2TabletPro              ,
		boxShadowOffsetY2TabletProLandscape     ,
		boxShadowOffsetY2Desktop                ,
		
		// blur radius
		boxShadowBlur2Mobile                 ,
		boxShadowBlur2MobileLandscape        ,
		boxShadowBlur2Tablet                 ,
		boxShadowBlur2TabletLandscape        ,
		boxShadowBlur2TabletPro              ,
		boxShadowBlur2TabletProLandscape     ,
		boxShadowBlur2Desktop                ,
		
		// spread radius
		boxShadowSpread2Mobile                 ,
		boxShadowSpread2MobileLandscape        ,
		boxShadowSpread2Tablet                 ,
		boxShadowSpread2TabletLandscape        ,
		boxShadowSpread2TabletPro              ,
		boxShadowSpread2TabletProLandscape     ,
		boxShadowSpread2Desktop                ,
		
		// color
		boxShadowColor2Mobile                 ,
		boxShadowColor2MobileLandscape        ,
		boxShadowColor2Tablet                 ,
		boxShadowColor2TabletLandscape        ,
		boxShadowColor2TabletPro              ,
		boxShadowColor2TabletProLandscape     ,
		boxShadowColor2Desktop                ,
	} = attr;
	
	// for later support of other units
	const appendix = ' !important';
	// prepare css string
	if(boxShadowType1Mobile === 'inside' && typeof boxShadowOffsetX1Mobile !== 'undefined' && boxShadowOffsetX1Mobile !== ''){
		boxShadowOffsetX1Mobile = 'inset '+boxShadowOffsetX1Mobile;
	}
	if(boxShadowType2Mobile === 'inside' && typeof boxShadowOffsetX2Mobile !== 'undefined' && boxShadowOffsetX2Mobile !== ''){
		boxShadowOffsetX2Mobile = 'inset '+boxShadowOffsetX2Mobile;
	}
	// offset-x | offset-y | blur-radius | spread-radius | color
	let _value = [
		mergeCSSValuesToString(boxShadowOffsetX1Mobile, boxShadowOffsetY1Mobile, boxShadowBlur1Mobile, boxShadowSpread1Mobile, boxShadowColor1Mobile),
		mergeCSSValuesToString(boxShadowOffsetX2Mobile, boxShadowOffsetY2Mobile, boxShadowBlur2Mobile, boxShadowSpread2Mobile, boxShadowColor2Mobile)
		].filter(val => val !== 'undefined').join(', ');

	// selectors
	const mobile = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1MobileLandscape === 'inside' && typeof boxShadowOffsetX1MobileLandscape !== 'undefined' && boxShadowOffsetX1MobileLandscape !== ''){
		boxShadowOffsetX1MobileLandscape = 'inset '+boxShadowOffsetX1MobileLandscape;
	}
	if(boxShadowType2MobileLandscape === 'inside' && typeof boxShadowOffsetX2MobileLandscape !== 'undefined' && boxShadowOffsetX2MobileLandscape !== ''){
		boxShadowOffsetX2MobileLandscape = 'inset '+boxShadowOffsetX2MobileLandscape;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1MobileLandscape, boxShadowOffsetY1MobileLandscape, boxShadowBlur1MobileLandscape, boxShadowSpread1MobileLandscape, boxShadowColor1MobileLandscape),
		mergeCSSValuesToString(boxShadowOffsetX2MobileLandscape, boxShadowOffsetY2MobileLandscape, boxShadowBlur2MobileLandscape, boxShadowSpread2MobileLandscape, boxShadowColor2MobileLandscape)
	].filter(val => val !== 'undefined').join(', ');
	const mobileLandscape = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1Tablet === 'inside' && typeof boxShadowOffsetX1Tablet !== 'undefined' && boxShadowOffsetX1Tablet !== ''){
		boxShadowOffsetX1Tablet = 'inset '+boxShadowOffsetX1Tablet;
	}
	if(boxShadowType2Tablet === 'inside' && typeof boxShadowOffsetX2Tablet !== 'undefined' && boxShadowOffsetX2Tablet !== ''){
		boxShadowOffsetX2Tablet = 'inset '+boxShadowOffsetX2Tablet;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1Tablet, boxShadowOffsetY1Tablet, boxShadowBlur1Tablet, boxShadowSpread1Tablet, boxShadowColor1Tablet),
		mergeCSSValuesToString(boxShadowOffsetX2Tablet, boxShadowOffsetY2Tablet, boxShadowBlur2Tablet, boxShadowSpread2Tablet, boxShadowColor2Tablet)
	].filter(val => val !== 'undefined').join(', ');
	const tablet = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1TabletLandscape === 'inside' && typeof boxShadowOffsetX1TabletLandscape !== 'undefined' && boxShadowOffsetX1TabletLandscape !== ''){
		boxShadowOffsetX1TabletLandscape = 'inset '+boxShadowOffsetX1TabletLandscape;
	}
	if(boxShadowType2TabletLandscape === 'inside' && typeof boxShadowOffsetX2TabletLandscape !== 'undefined' && boxShadowOffsetX2TabletLandscape !== ''){
		boxShadowOffsetX2TabletLandscape = 'inset '+boxShadowOffsetX2TabletLandscape;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1TabletLandscape, boxShadowOffsetY1TabletLandscape, boxShadowBlur1TabletLandscape, boxShadowSpread1TabletLandscape, boxShadowColor1TabletLandscape),
		mergeCSSValuesToString(boxShadowOffsetX2TabletLandscape, boxShadowOffsetY2TabletLandscape, boxShadowBlur2TabletLandscape, boxShadowSpread2TabletLandscape, boxShadowColor2TabletLandscape)
	].filter(val => val !== 'undefined').join(', ');
	const tabletLandscape = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1TabletPro === 'inside' && typeof boxShadowOffsetX1TabletPro !== 'undefined' && boxShadowOffsetX1TabletPro !== ''){
		boxShadowOffsetX1TabletPro = 'inset '+boxShadowOffsetX1TabletPro;
	}
	if(boxShadowType2TabletPro === 'inside' && typeof boxShadowOffsetX2TabletPro !== 'undefined' && boxShadowOffsetX2TabletPro !== ''){
		boxShadowOffsetX2TabletPro = 'inset '+boxShadowOffsetX2TabletPro;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1TabletPro, boxShadowOffsetY1TabletPro, boxShadowBlur1TabletPro, boxShadowSpread1TabletPro, boxShadowColor1TabletPro),
		mergeCSSValuesToString(boxShadowOffsetX2TabletPro, boxShadowOffsetY2TabletPro, boxShadowBlur2TabletPro, boxShadowSpread2TabletPro, boxShadowColor2TabletPro)
	].filter(val => val !== 'undefined').join(', ');
	const tabletPro = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1TabletProLandscape === 'inside' && typeof boxShadowOffsetX1TabletProLandscape !== 'undefined' && boxShadowOffsetX1TabletProLandscape !== ''){
		boxShadowOffsetX1TabletProLandscape = 'inset '+boxShadowOffsetX1TabletProLandscape;
	}
	if(boxShadowType2TabletProLandscape === 'inside' && typeof boxShadowOffsetX2TabletProLandscape !== 'undefined' && boxShadowOffsetX2TabletProLandscape !== ''){
		boxShadowOffsetX2TabletProLandscape = 'inset '+boxShadowOffsetX2TabletProLandscape;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1TabletProLandscape, boxShadowOffsetY1TabletProLandscape, boxShadowBlur1TabletProLandscape, boxShadowSpread1TabletProLandscape, boxShadowColor1TabletProLandscape),
		mergeCSSValuesToString(boxShadowOffsetX2TabletProLandscape, boxShadowOffsetY2TabletProLandscape, boxShadowBlur2TabletProLandscape, boxShadowSpread2TabletProLandscape, boxShadowColor2TabletProLandscape)
	].filter(val => val !== 'undefined').join(', ');
	const tabletProLandscape = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
		},
	};
	
	if(boxShadowType1Desktop === 'inside' && typeof boxShadowOffsetX1Desktop !== 'undefined' && boxShadowOffsetX1Desktop !== ''){
		boxShadowOffsetX1Desktop = 'inset '+boxShadowOffsetX1Desktop;
	}
	if(boxShadowType2Desktop === 'inside' && typeof boxShadowOffsetX2Desktop !== 'undefined' && boxShadowOffsetX2Desktop !== ''){
		boxShadowOffsetX2Desktop = 'inset '+boxShadowOffsetX2Desktop;
	}
	_value = [
		mergeCSSValuesToString(boxShadowOffsetX1Desktop, boxShadowOffsetY1Desktop, boxShadowBlur1Desktop, boxShadowSpread1Desktop, boxShadowColor1Desktop),
		mergeCSSValuesToString(boxShadowOffsetX2Desktop, boxShadowOffsetY2Desktop, boxShadowBlur2Desktop, boxShadowSpread2Desktop, boxShadowColor2Desktop)
	].filter(val => val !== 'undefined').join(', ');
	const desktop = {
		[wpBlockSelector]: {
			'box-shadow': typeof _value !== 'undefined' ? _value + appendix : '',
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
