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
	ColorPalette,
	SelectControl,
	Popover
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
		borderWidthTopMobile                 :{ type: 'string', default: ''},
		borderWidthTopMobileLandscape        :{ type: 'string', default: ''},
		borderWidthTopTablet                 :{ type: 'string', default: ''},
		borderWidthTopTabletLandscape        :{ type: 'string', default: ''},
		borderWidthTopTabletPro              :{ type: 'string', default: ''},
		borderWidthTopTabletProLandscape     :{ type: 'string', default: ''},
		borderWidthTopDesktop                :{ type: 'string', default: ''},
		
		borderWidthRightMobile                 :{ type: 'string', default: ''},
		borderWidthRightMobileLandscape        :{ type: 'string', default: ''},
		borderWidthRightTablet                 :{ type: 'string', default: ''},
		borderWidthRightTabletLandscape        :{ type: 'string', default: ''},
		borderWidthRightTabletPro              :{ type: 'string', default: ''},
		borderWidthRightTabletProLandscape     :{ type: 'string', default: ''},
		borderWidthRightDesktop                :{ type: 'string', default: ''},
		
		borderWidthBottomMobile                 :{ type: 'string', default: ''},
		borderWidthBottomMobileLandscape        :{ type: 'string', default: ''},
		borderWidthBottomTablet                 :{ type: 'string', default: ''},
		borderWidthBottomTabletLandscape        :{ type: 'string', default: ''},
		borderWidthBottomTabletPro              :{ type: 'string', default: ''},
		borderWidthBottomTabletProLandscape     :{ type: 'string', default: ''},
		borderWidthBottomDesktop                :{ type: 'string', default: ''},
		
		borderWidthLeftMobile                 :{ type: 'string', default: ''},
		borderWidthLeftMobileLandscape        :{ type: 'string', default: ''},
		borderWidthLeftTablet                 :{ type: 'string', default: ''},
		borderWidthLeftTabletLandscape        :{ type: 'string', default: ''},
		borderWidthLeftTabletPro              :{ type: 'string', default: ''},
		borderWidthLeftTabletProLandscape     :{ type: 'string', default: ''},
		borderWidthLeftDesktop                :{ type: 'string', default: ''},
		
		// color
		borderColorTopMobile                 :{ type: 'string', default: '#00000'},
		borderColorTopMobileLandscape        :{ type: 'string', default: '#00000'},
		borderColorTopTablet                 :{ type: 'string', default: '#00000'},
		borderColorTopTabletLandscape        :{ type: 'string', default: '#00000'},
		borderColorTopTabletPro              :{ type: 'string', default: '#00000'},
		borderColorTopTabletProLandscape     :{ type: 'string', default: '#00000'},
		borderColorTopDesktop                :{ type: 'string', default: '#00000'},
		
		borderColorRightMobile                 :{ type: 'string', default: '#00000'},
		borderColorRightMobileLandscape        :{ type: 'string', default: '#00000'},
		borderColorRightTablet                 :{ type: 'string', default: '#00000'},
		borderColorRightTabletLandscape        :{ type: 'string', default: '#00000'},
		borderColorRightTabletPro              :{ type: 'string', default: '#00000'},
		borderColorRightTabletProLandscape     :{ type: 'string', default: '#00000'},
		borderColorRightDesktop                :{ type: 'string', default: '#00000'},
		
		borderColorBottomMobile                 :{ type: 'string', default: '#00000'},
		borderColorBottomMobileLandscape        :{ type: 'string', default: '#00000'},
		borderColorBottomTablet                 :{ type: 'string', default: '#00000'},
		borderColorBottomTabletLandscape        :{ type: 'string', default: '#00000'},
		borderColorBottomTabletPro              :{ type: 'string', default: '#00000'},
		borderColorBottomTabletProLandscape     :{ type: 'string', default: '#00000'},
		borderColorBottomDesktop                :{ type: 'string', default: '#00000'},
		
		borderColorLeftMobile                 :{ type: 'string', default: '#00000'},
		borderColorLeftMobileLandscape        :{ type: 'string', default: '#00000'},
		borderColorLeftTablet                 :{ type: 'string', default: '#00000'},
		borderColorLeftTabletLandscape        :{ type: 'string', default: '#00000'},
		borderColorLeftTabletPro              :{ type: 'string', default: '#00000'},
		borderColorLeftTabletProLandscape     :{ type: 'string', default: '#00000'},
		borderColorLeftDesktop                :{ type: 'string', default: '#00000'},
		
		// style
		borderStyleTopMobile                 :{ type: 'string', default: 'solid'},
		borderStyleTopMobileLandscape        :{ type: 'string', default: 'solid'},
		borderStyleTopTablet                 :{ type: 'string', default: 'solid'},
		borderStyleTopTabletLandscape        :{ type: 'string', default: 'solid'},
		borderStyleTopTabletPro              :{ type: 'string', default: 'solid'},
		borderStyleTopTabletProLandscape     :{ type: 'string', default: 'solid'},
		borderStyleTopDesktop                :{ type: 'string', default: 'solid'},
		
		borderStyleRightMobile                 :{ type: 'string', default: 'solid'},
		borderStyleRightMobileLandscape        :{ type: 'string', default: 'solid'},
		borderStyleRightTablet                 :{ type: 'string', default: 'solid'},
		borderStyleRightTabletLandscape        :{ type: 'string', default: 'solid'},
		borderStyleRightTabletPro              :{ type: 'string', default: 'solid'},
		borderStyleRightTabletProLandscape     :{ type: 'string', default: 'solid'},
		borderStyleRightDesktop                :{ type: 'string', default: 'solid'},
		
		borderStyleBottomMobile                 :{ type: 'string', default: 'solid'},
		borderStyleBottomMobileLandscape        :{ type: 'string', default: 'solid'},
		borderStyleBottomTablet                 :{ type: 'string', default: 'solid'},
		borderStyleBottomTabletLandscape        :{ type: 'string', default: 'solid'},
		borderStyleBottomTabletPro              :{ type: 'string', default: 'solid'},
		borderStyleBottomTabletProLandscape     :{ type: 'string', default: 'solid'},
		borderStyleBottomDesktop                :{ type: 'string', default: 'solid'},
		
		borderStyleLeftMobile                 :{ type: 'string', default: 'solid'},
		borderStyleLeftMobileLandscape        :{ type: 'string', default: 'solid'},
		borderStyleLeftTablet                 :{ type: 'string', default: 'solid'},
		borderStyleLeftTabletLandscape        :{ type: 'string', default: 'solid'},
		borderStyleLeftTabletPro              :{ type: 'string', default: 'solid'},
		borderStyleLeftTabletProLandscape     :{ type: 'string', default: 'solid'},
		borderStyleLeftDesktop                :{ type: 'string', default: 'solid'},
		
		// utils
		_borderColorPopover                :{ type: 'boolean', default: false },
		_borderColorPopoverCallback        :{ type: 'object', default: {} },
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
	console.log(wp.components);
	
	const settings = wp.data.select( 'core/block-editor' ).getSettings();
	let themeColors = [];
	
	if ( settings && settings.colors ) {
		themeColors = settings.colors;
	}
	
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
								<UnitControl value={ values[_prefix+'WidthTop'+currentResponsiveTab] }
								            onChange={(val) => updateCSS(val, props, _name, _prefix + 'WidthTop', EditorStyles) }
								            onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'WidthTop', EditorStyles) }
								            allowReset={false}
								/>
						</FlexItem>
						<FlexItem>
							<SelectControl
								value={ values[_prefix+'StyleTop'+currentResponsiveTab] }
								onChange={(val) => updateCSS(val, props, _name, _prefix + 'StyleTop', EditorStyles)}
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
							<ColorIndicator
										className={'clickable'}
										colorValue={values[_prefix+'ColorTop'+currentResponsiveTab]}
										onClick={()=>props.setAttributes({_borderColorPopover: true})}
										/>
							{ values._borderColorPopover === true &&
							<Popover position='left' onClose={()=>props.setAttributes({_borderColorPopover: false})}>
								<ColorPalette
									colors={ themeColors }
									value={ values[_prefix+'ColorTop'+currentResponsiveTab] }
									onChange={ ( val ) => updateCSS(val, props, _name, _prefix + 'ColorTop', EditorStyles) }
								/>
							</Popover>
							}
							
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