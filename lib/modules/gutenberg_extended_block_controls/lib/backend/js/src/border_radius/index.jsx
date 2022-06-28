import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSSWithDimensionsCorners, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl, __experimentalBoxControl } = wp.components;
const BoxControl = __experimentalBoxControl;
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
	
	const boxValues = {
		top:values[_prefix+'TopLeft'+currentResponsiveTab],
		right:values[_prefix+'TopRight'+currentResponsiveTab],
		bottom:values[_prefix+'BottomLeft'+currentResponsiveTab],
		left:values[_prefix+'BottomRight'+currentResponsiveTab],
	};
	
	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Border Radius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<BoxControl values={boxValues}
					            onChange={(values) => updateCSSWithDimensionsCorners(values, props, _name, _prefix, EditorStyles) }
					            onUnitChange={(values) => updateCSSWithDimensionsCorners(values, props, _name, _prefix, EditorStyles) }
					            allowReset={false}
					            label={''}
					/>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Border Radius', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
}

export default BorderRadius;