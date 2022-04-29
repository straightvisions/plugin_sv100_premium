import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from "../helpers";

const { Fragment } = wp.element;
const { __experimentalUnitControl , ToggleControl, PanelRow } = wp.components;
const UnitControl = __experimentalUnitControl;
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
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		borderRadiusActive                    :{ type: 'boolean', default: false },
	
		borderRadiusTopLeftMobile                 :{ type: 'string'},
		borderRadiusTopLeftMobileLandscape        :{ type: 'string'},
		borderRadiusTopLeftTablet                :{ type: 'string'},
		borderRadiusTopLeftTabletLandscape        :{ type: 'string'},
		borderRadiusTopLeftTabletPro              :{ type: 'string'},
		borderRadiusTopLeftTabletProLandscape     :{ type: 'string'},
		borderRadiusTopLeftDesktop                :{ type: 'string'},
		
		borderRadiusTopRightMobile                 :{ type: 'string'},
		borderRadiusTopRightMobileLandscape        :{ type: 'string'},
		borderRadiusTopRightTablet                :{ type: 'string'},
		borderRadiusTopRightTabletLandscape        :{ type: 'string'},
		borderRadiusTopRightTabletPro              :{ type: 'string'},
		borderRadiusTopRightTabletProLandscape     :{ type: 'string'},
		borderRadiusTopRightDesktop                :{ type: 'string'},
		
		borderRadiusBottomLeftMobile                 :{ type: 'string'},
		borderRadiusBottomLeftMobileLandscape        :{ type: 'string'},
		borderRadiusBottomLeftTablet                 :{ type: 'string'},
		borderRadiusBottomLeftTabletLandscape        :{ type: 'string'},
		borderRadiusBottomLeftTabletPro              :{ type: 'string'},
		borderRadiusBottomLeftTabletProLandscape     :{ type: 'string'},
		borderRadiusBottomLeftDesktop                :{ type: 'string'},
		
		borderRadiusBottomRightMobile                 :{ type: 'string'},
		borderRadiusBottomRightMobileLandscape        :{ type: 'string'},
		borderRadiusBottomRightTablet                 :{ type: 'string'},
		borderRadiusBottomRightTabletLandscape        :{ type: 'string'},
		borderRadiusBottomRightTabletPro              :{ type: 'string'},
		borderRadiusBottomRightTabletProLandscape     :{ type: 'string'},
		borderRadiusBottomRightDesktop                :{ type: 'string'},
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

	const values = props.attributes;
	const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== 'undefined' ? props.attributes.currentResponsiveTab : 'Mobile';

	const topLeftValue =  (typeof values[_prefix+'TopLeft'+currentResponsiveTab] === 'undefined') ? '' : values[_prefix+'TopLeft'+currentResponsiveTab];
	const topRightValue =  (typeof values[_prefix+'TopRight'+currentResponsiveTab] === 'undefined') ? '' : values[_prefix+'TopRight'+currentResponsiveTab];
	const bottomLeftValue =  (typeof values[_prefix+'BottomLeft'+currentResponsiveTab] === 'undefined') ? '' : values[_prefix+'BottomLeft'+currentResponsiveTab];
	const bottomRightValue =  (typeof values[_prefix+'BottomRight'+currentResponsiveTab] === 'undefined') ? '' : values[_prefix+'BottomRight'+currentResponsiveTab];
	
	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Border Radius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<UnitControl
						value={topLeftValue}
						onChange={(val) => updateCSS(val, props, _name, _prefix+'TopLeft', EditorStyles) }
						onUnitChange={(val) => updateCSS(val, props, _name, _prefix+'TopLeft', EditorStyles) }
					/>
					<UnitControl
						value={topRightValue}
						onChange={(val) => updateCSS(val, props, _name, _prefix+'TopRight', EditorStyles) }
						onUnitChange={(val) => updateCSS(val, props, _name, _prefix+'TopRight', EditorStyles) }
					/>
					<UnitControl
						value={bottomLeftValue}
						onChange={(val) => updateCSS(val, props, _name, _prefix+'BottomLeft', EditorStyles) }
						onUnitChange={(val) => updateCSS(val, props, _name, _prefix+'BottomLeft', EditorStyles) }
					/>
					<UnitControl
						value={bottomRightValue}
						onChange={(val) => updateCSS(val, props, _name, _prefix+'BottomRight', EditorStyles) }
						onUnitChange={(val) => updateCSS(val, props, _name, _prefix+'BottomRight', EditorStyles) }
					/>
					<br/>
				</PanelRow>
			</Fragment>
	
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Border Radius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default BorderRadius;