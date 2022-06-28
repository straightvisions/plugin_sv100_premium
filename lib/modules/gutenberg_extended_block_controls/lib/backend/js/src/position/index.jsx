import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, updateCSSWithDimensions, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const {
	PanelRow,
	ToggleControl,
	SelectControl,
	__experimentalBoxControl,
	__experimentalInputControl,
	Flex,
	FlexItem
} = wp.components;
const BoxControl =  __experimentalBoxControl;
const InputControl =  __experimentalInputControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.position.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		positionActive                 :{ type: 'boolean', default: false },
		positionMobile                 :{ type: 'string', default: '' },
		positionMobileLandscape        :{ type: 'string', default: '' },
		positionTablet                 :{ type: 'string', default: '' },
		positionTabletLandscape        :{ type: 'string', default: '' },
		positionTabletPro              :{ type: 'string', default: '' },
		positionTabletProLandscape     :{ type: 'string', default: '' },
		positionDesktop                :{ type: 'string', default: '' },
		
		positionTopMobile                 :{ type: 'string', default: '' },
		positionTopMobileLandscape        :{ type: 'string', default: '' },
		positionTopTablet                 :{ type: 'string', default: '' },
		positionTopTabletLandscape        :{ type: 'string', default: '' },
		positionTopTabletPro              :{ type: 'string', default: '' },
		positionTopTabletProLandscape     :{ type: 'string', default: '' },
		positionTopDesktop                :{ type: 'string', default: '' },
		
		positionBottomMobile                 :{ type: 'string', default: '' },
		positionBottomMobileLandscape        :{ type: 'string', default: '' },
		positionBottomTablet                 :{ type: 'string', default: '' },
		positionBottomTabletLandscape        :{ type: 'string', default: '' },
		positionBottomTabletPro              :{ type: 'string', default: '' },
		positionBottomTabletProLandscape     :{ type: 'string', default: '' },
		positionBottomDesktop                :{ type: 'string', default: '' },
		
		positionLeftMobile                 :{ type: 'string', default: '' },
		positionLeftMobileLandscape        :{ type: 'string', default: '' },
		positionLeftTablet                 :{ type: 'string', default: '' },
		positionLeftTabletLandscape        :{ type: 'string', default: '' },
		positionLeftTabletPro              :{ type: 'string', default: '' },
		positionLeftTabletProLandscape     :{ type: 'string', default: '' },
		positionLeftDesktop                :{ type: 'string', default: '' },
		
		positionRightMobile                 :{ type: 'string', default: '' },
		positionRightMobileLandscape        :{ type: 'string', default: '' },
		positionRightTablet                 :{ type: 'string', default: '' },
		positionRightTabletLandscape        :{ type: 'string', default: '' },
		positionRightTabletPro              :{ type: 'string', default: '' },
		positionRightTabletProLandscape     :{ type: 'string', default: '' },
		positionRightDesktop                :{ type: 'string', default: '' },
		
		positionZindexMobile                 :{ type: 'string', default: '' },
		positionZindexMobileLandscape        :{ type: 'string', default: '' },
		positionZindexTablet                 :{ type: 'string', default: '' },
		positionZindexTabletLandscape        :{ type: 'string', default: '' },
		positionZindexTabletPro              :{ type: 'string', default: '' },
		positionZindexTabletProLandscape     :{ type: 'string', default: '' },
		positionZindexDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Position(props){
	const _name = 'Position';
	const _prefix = 'position';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	const boxValues = {
		top:values[_prefix+'Top'+currentResponsiveTab],
		right:values[_prefix+'Right'+currentResponsiveTab],
		bottom:values[_prefix+'Bottom'+currentResponsiveTab],
		left:values[_prefix+'Left'+currentResponsiveTab],
	};

	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Position', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
					help={__('For absolute, fixed positioning etc. you should set position relative on a parent element like a group block. Positioning is only applied on frontend output, not within Gutenberg.', 'sv100_premium')}
				/>
				<PanelRow className={'no-margin-bottom'}>
					<Flex>
						<FlexItem>
							<SelectControl
								value={ values[_prefix+currentResponsiveTab] }
								onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
								options={ [
									{ value: '', label: 'Select'},
									{ value: 'relative', label: 'Relative' },
									{ value: 'absolute', label: 'Absolute' },
									{ value: 'fixed', label: 'Fixed' },
									{ value: 'sticky', label: 'Sticky' },
									{ value: 'static', label: 'Static' },
									{ value: 'inherit', label: 'Inherit' },
									{ value: 'initial', label: 'Initial' },
									{ value: 'unset', label: 'Unset' },
									{ value: 'revert', label: 'Revert' },
								] }
							/>
						</FlexItem>
						<FlexItem>
							<InputControl
								value={ values[_prefix+'Zindex'+currentResponsiveTab] }
								onChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Zindex', EditorStyles) } }
								placeholder={'Z-Index'}
							/>
						</FlexItem>
					</Flex>
				</PanelRow>
				<PanelRow>
					<BoxControl values={boxValues}
					            onChange={(values) => updateCSSWithDimensions(values, props, _name, _prefix, EditorStyles) }
					            onUnitChange={(values) => updateCSSWithDimensions(values, props, _name, _prefix, EditorStyles) }
					            allowReset={false}
					            label={''}
					            inputProps={{ min: -99999 }}
					/>
				</PanelRow>
				
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Position', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Position;