import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from "../helpers";

const { Fragment } = wp.element;
const {
	PanelRow,
	ToggleControl,
	__experimentalUnitControl,
	Label,
	Flex,
	FlexBlock,
	FlexItem,
	ColorIndicator,
	ColorPicker,
	SelectControl
} = wp.components;

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
		borderActive                    :{ type: 'boolean', default: false },
		borderMoreActive                :{ type: 'boolean', default: false },
	
		// border width
		borderWidthTopMobile                 :{ type: 'string'},
		borderWidthTopMobileLandscape        :{ type: 'string'},
		borderWidthTopTablet                 :{ type: 'string'},
		borderWidthTopTabletLandscape        :{ type: 'string'},
		borderWidthTopTabletPro              :{ type: 'string'},
		borderWidthTopTabletProLandscape     :{ type: 'string'},
		borderWidthTopDesktop                :{ type: 'string'},
		
		borderWidthRightMobile                 :{ type: 'string'},
		borderWidthRightMobileLandscape        :{ type: 'string'},
		borderWidthRightTablet                 :{ type: 'string'},
		borderWidthRightTabletLandscape        :{ type: 'string'},
		borderWidthRightTabletPro              :{ type: 'string'},
		borderWidthRightTabletProLandscape     :{ type: 'string'},
		borderWidthRightDesktop                :{ type: 'string'},
		
		borderWidthBottomMobile                 :{ type: 'string'},
		borderWidthBottomMobileLandscape        :{ type: 'string'},
		borderWidthBottomTablet                 :{ type: 'string'},
		borderWidthBottomTabletLandscape        :{ type: 'string'},
		borderWidthBottomTabletPro              :{ type: 'string'},
		borderWidthBottomTabletProLandscape     :{ type: 'string'},
		borderWidthBottomDesktop                :{ type: 'string'},
		
		borderWidthLeftMobile                 :{ type: 'string'},
		borderWidthLeftMobileLandscape        :{ type: 'string'},
		borderWidthLeftTablet                 :{ type: 'string'},
		borderWidthLeftTabletLandscape        :{ type: 'string'},
		borderWidthLeftTabletPro              :{ type: 'string'},
		borderWidthLeftTabletProLandscape     :{ type: 'string'},
		borderWidthLeftDesktop                :{ type: 'string'},
		
		// color
		borderColorTopMobile                 :{ type: 'string'},
		borderColorTopMobileLandscape        :{ type: 'string'},
		borderColorTopTablet                 :{ type: 'string'},
		borderColorTopTabletLandscape        :{ type: 'string'},
		borderColorTopTabletPro              :{ type: 'string'},
		borderColorTopTabletProLandscape     :{ type: 'string'},
		borderColorTopDesktop                :{ type: 'string'},
		
		borderColorRightMobile                 :{ type: 'string'},
		borderColorRightMobileLandscape        :{ type: 'string'},
		borderColorRightTablet                 :{ type: 'string'},
		borderColorRightTabletLandscape        :{ type: 'string'},
		borderColorRightTabletPro              :{ type: 'string'},
		borderColorRightTabletProLandscape     :{ type: 'string'},
		borderColorRightDesktop                :{ type: 'string'},
		
		borderColorBottomMobile                 :{ type: 'string'},
		borderColorBottomMobileLandscape        :{ type: 'string'},
		borderColorBottomTablet                 :{ type: 'string'},
		borderColorBottomTabletLandscape        :{ type: 'string'},
		borderColorBottomTabletPro              :{ type: 'string'},
		borderColorBottomTabletProLandscape     :{ type: 'string'},
		borderColorBottomDesktop                :{ type: 'string'},
		
		borderColorLeftMobile                 :{ type: 'string'},
		borderColorLeftMobileLandscape        :{ type: 'string'},
		borderColorLeftTablet                 :{ type: 'string'},
		borderColorLeftTabletLandscape        :{ type: 'string'},
		borderColorLeftTabletPro              :{ type: 'string'},
		borderColorLeftTabletProLandscape     :{ type: 'string'},
		borderColorLeftDesktop                :{ type: 'string'},
		
		// style
		borderStyleTopMobile                 :{ type: 'string'},
		borderStyleTopMobileLandscape        :{ type: 'string'},
		borderStyleTopTablet                 :{ type: 'string'},
		borderStyleTopTabletLandscape        :{ type: 'string'},
		borderStyleTopTabletPro              :{ type: 'string'},
		borderStyleTopTabletProLandscape     :{ type: 'string'},
		borderStyleTopDesktop                :{ type: 'string'},
		
		borderStyleRightMobile                 :{ type: 'string'},
		borderStyleRightMobileLandscape        :{ type: 'string'},
		borderStyleRightTablet                 :{ type: 'string'},
		borderStyleRightTabletLandscape        :{ type: 'string'},
		borderStyleRightTabletPro              :{ type: 'string'},
		borderStyleRightTabletProLandscape     :{ type: 'string'},
		borderStyleRightDesktop                :{ type: 'string'},
		
		borderStyleBottomMobile                 :{ type: 'string'},
		borderStyleBottomMobileLandscape        :{ type: 'string'},
		borderStyleBottomTablet                 :{ type: 'string'},
		borderStyleBottomTabletLandscape        :{ type: 'string'},
		borderStyleBottomTabletPro              :{ type: 'string'},
		borderStyleBottomTabletProLandscape     :{ type: 'string'},
		borderStyleBottomDesktop                :{ type: 'string'},
		
		borderStyleLeftMobile                 :{ type: 'string'},
		borderStyleLeftMobileLandscape        :{ type: 'string'},
		borderStyleLeftTablet                 :{ type: 'string'},
		borderStyleLeftTabletLandscape        :{ type: 'string'},
		borderStyleLeftTabletPro              :{ type: 'string'},
		borderStyleLeftTabletProLandscape     :{ type: 'string'},
		borderStyleLeftDesktop                :{ type: 'string'},
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Border(props){
	const _name = 'Border';
	const _prefix = 'border';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}

	const values = props.attributes;
	const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== 'undefined' ? props.attributes.currentResponsiveTab : 'Mobile';
	console.log(values);
	console.log(values[_prefix+'WidthTop'+currentResponsiveTab]);
	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Border', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<Flex>
						<FlexItem>
								<UnitControl values={ values[_prefix+'WidthTop'+currentResponsiveTab] }
								            onChange={(val) => updateCSS(val, props, _name, _prefix + 'WidthTop', EditorStyles) }
								            onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'WidthTop', EditorStyles) }
								            allowReset={false}
								            label={'Border Width'}
								/>
						</FlexItem>
						<FlexItem>
							<SelectControl
								label={__('Style', 'sv100_premium')}
								color={ values[_prefix+'StyleTop'+currentResponsiveTab] }
								onChangeComplete={(val) => updateCSS(val.hex, props, _name, _prefix + 'StyleTop', EditorStyles)}
								options={[
									{ label: __('Solid', 'sv100_premium'), value: 'solid' },
									{ label: __('Dashed', 'sv100_premium'), value: 'dashed' },
									{ label: __('Dotted', 'sv100_premium'), value: 'dotted' },
									{ label: __('Double', 'sv100_premium'), value: 'double' },
									{ label: __('Groove', 'sv100_premium'), value: 'groove' },
									{ label: __('Ridge', 'sv100_premium'), value: 'ridge' },
									{ label: __('Inset', 'sv100_premium'), value: 'inset' },
									{ label: __('Outset', 'sv100_premium'), value: 'outset' },
								]}
							/>
						</FlexItem>
						<FlexItem>
							<Label>Color</Label>
							<ColorIndicator
										colorValue={values[_prefix+'ColorTop'+currentResponsiveTab]}
										/>
						</FlexItem>
					</Flex>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Border', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
}

export default Border;