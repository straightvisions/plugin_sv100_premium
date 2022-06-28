import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut} from "../helpers";
import attributes from "./attributes.js";

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

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.border.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, attributes );
	
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
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
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
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
}

export default Border;