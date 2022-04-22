import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from "../helpers";

const { Fragment } = wp.element;
const { RangeControl, ToggleControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const enableCustomControlOnBlocks = [
	'core/paragraph',
	'core/image',
	'core/heading',
	'core/gallery',
	'core/list',
	'core/quote',
	'core/shortcode',
	'core/archives',
	'core/audio',
	'core/button',
	'core/buttons',
	'core/calendar',
	'core/categories',
	'core/code',
	'core/columns',
	'core/column',
	'core/cover',
	'core/embed',
	'core/file',
	'core/group',
	'core/freeform',
	'core/html',
	'core/media-text',
	'core/latest-comments',
	'core/latest-posts',
	'core/missing',
	'core/more',
	'core/nextpage',
	'core/preformatted',
	'core/pullquote',
	'core/rss',
	'core/search',
	'core/separator',
	'core/block',
	'core/social-links',
	'core/social-link',
	'core/spacer',
	'core/subhead',
	'core/table',
	'core/tag-cloud',
	'core/text-columns',
	'core/verse',
	'core/video'
];

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	console.log(typeof settings.attributes.borderRadiusTopLeftMobile);
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		borderRadiusActive                    :{ type: 'boolean', default: false },
	
		borderRadiusTopLeftMobileValue                 :{ type: 'integer', default: ''},
		borderRadiusTopLeftMobileLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusTopLeftTabletValue                :{ type: 'integer', default: ''},
		borderRadiusTopLeftTabletLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusTopLeftTabletProValue              :{ type: 'integer', default: ''},
		borderRadiusTopLeftTabletProLandscapeValue     :{ type: 'integer', default: ''},
		borderRadiusTopLeftDesktopValue                :{ type: 'integer', default: ''},
		
		borderRadiusTopRightMobileValue                 :{ type: 'integer', default: ''},
		borderRadiusTopRightMobileLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusTopRightTabletValue                :{ type: 'integer', default: ''},
		borderRadiusTopRightTabletLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusTopRightTabletProValue              :{ type: 'integer', default: ''},
		borderRadiusTopRightTabletProLandscapeValue     :{ type: 'integer', default: ''},
		borderRadiusTopRightDesktopValue                :{ type: 'integer', default: ''},
		
		borderRadiusBottomLeftMobileValue                 :{ type: 'integer', default: ''},
		borderRadiusBottomLeftMobileLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusBottomLeftTabletValue                 :{ type: 'integer', default: ''},
		borderRadiusBottomLeftTabletLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusBottomLeftTabletProValue              :{ type: 'integer', default: ''},
		borderRadiusBottomLeftTabletProLandscapeValue     :{ type: 'integer', default: ''},
		borderRadiusBottomLeftDesktopValue                :{ type: 'integer', default: ''},
		
		borderRadiusBottomRightMobileValue                 :{ type: 'integer', default: ''},
		borderRadiusBottomRightMobileLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusBottomRightTabletValue                 :{ type: 'integer', default: ''},
		borderRadiusBottomRightTabletLandscapeValue        :{ type: 'integer', default: ''},
		borderRadiusBottomRightTabletProValue              :{ type: 'integer', default: ''},
		borderRadiusBottomRightTabletProLandscapeValue     :{ type: 'integer', default: ''},
		borderRadiusBottomRightDesktopValue                :{ type: 'integer', default: ''},
		
		
		borderRadiusTopLeftMobileUnit                 :{ type: 'string', default: 'px'},
		borderRadiusTopLeftMobileLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusTopLeftTabletUnit                :{ type: 'string', default: 'px'},
		borderRadiusTopLeftTabletLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusTopLeftTabletProUnit              :{ type: 'string', default: 'px'},
		borderRadiusTopLeftTabletProLandscapeUnit     :{ type: 'string', default: 'px'},
		borderRadiusTopLeftDesktopUnit                :{ type: 'string', default: 'px'},
		
		borderRadiusTopRightMobileUnit                 :{ type: 'string', default: 'px'},
		borderRadiusTopRightMobileLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusTopRightTabletUnit                :{ type: 'string', default: 'px'},
		borderRadiusTopRightTabletLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusTopRightTabletProUnit              :{ type: 'string', default: 'px'},
		borderRadiusTopRightTabletProLandscapeUnit     :{ type: 'string', default: 'px'},
		borderRadiusTopRightDesktopUnit                :{ type: 'string', default: 'px'},
		
		borderRadiusBottomLeftMobileUnit                 :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftMobileLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftTabletUnit                 :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftTabletLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftTabletProUnit              :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftTabletProLandscapeUnit     :{ type: 'string', default: 'px'},
		borderRadiusBottomLeftDesktopUnit                :{ type: 'string', default: 'px'},
		
		borderRadiusBottomRightMobileUnit                 :{ type: 'string', default: 'px'},
		borderRadiusBottomRightMobileLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusBottomRightTabletUnit                 :{ type: 'string', default: 'px'},
		borderRadiusBottomRightTabletLandscapeUnit        :{ type: 'string', default: 'px'},
		borderRadiusBottomRightTabletProUnit              :{ type: 'string', default: 'px'},
		borderRadiusBottomRightTabletProLandscapeUnit     :{ type: 'string', default: 'px'},
		borderRadiusBottomRightDesktopUnit                :{ type: 'string', default: 'px'},
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function BorderRadius(props){
	const _name = 'BorderRadius';
	const _prefix = 'borderRadius';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	console.log(props);
	const values = props.attributes;
	const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== 'undefined' ? props.attributes.currentResponsiveTab : 'Mobile';

	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Border Radius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
				<RangeControl
					label={__('Top-Left', 'sv100_premium')}
					value={parseInt(values[_prefix+'TopLeft'+currentResponsiveTab]+'Value')}
					onChange={(val) => updateCSS(val, props, _name, _prefix+'TopLeft', EditorStyles, 'Value') }
				/>
				<RangeControl
					label={__('Top-Right', 'sv100_premium')}
					value={values[_prefix+'TopRight'+currentResponsiveTab]+'Value'}
					onChange={(val) => updateCSS(val, props, _name, _prefix+'TopRight', EditorStyles, 'Value') }
				/>
				<RangeControl
					label={__('Bottom-Left', 'sv100_premium')}
					value={values[_prefix+'BottomLeft'+currentResponsiveTab]+'Value'}
					onChange={(val) => updateCSS(val, props, _name, _prefix+'BottomLeft', EditorStyles, 'Value') }
				/>
				<RangeControl
					label={__('Bottom-Right', 'sv100_premium')}
					value={values[_prefix+'BottomRight'+currentResponsiveTab]+'Value'}
					onChange={(val) => updateCSSe(val, props, _name, _prefix+'BottomRight', EditorStyles, 'Value') }
				/>
				
				
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('BorderRadius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default BorderRadius;