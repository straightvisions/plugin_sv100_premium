import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSSWithDimensions, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl, __experimentalBoxControl } = wp.components;
const BoxControl = __experimentalBoxControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.paddingCoreButton.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		paddingActive                    :{ type: 'boolean', default: false },
	
		paddingTopMobile                 :{ type: 'string', default: '' },
		paddingTopMobileLandscape        :{ type: 'string', default: '' },
		paddingTopTablet                 :{ type: 'string', default: '' },
		paddingTopTabletLandscape        :{ type: 'string', default: '' },
		paddingTopTabletPro              :{ type: 'string', default: '' },
		paddingTopTabletProLandscape     :{ type: 'string', default: '' },
		paddingTopDesktop                :{ type: 'string', default: '' },
		
		paddingBottomMobile                 :{ type: 'string', default: '' },
		paddingBottomMobileLandscape        :{ type: 'string', default: '' },
		paddingBottomTablet                 :{ type: 'string', default: '' },
		paddingBottomTabletLandscape        :{ type: 'string', default: '' },
		paddingBottomTabletPro              :{ type: 'string', default: '' },
		paddingBottomTabletProLandscape     :{ type: 'string', default: '' },
		paddingBottomDesktop                :{ type: 'string', default: '' },
		
		paddingLeftMobile                 :{ type: 'string', default: '' },
		paddingLeftMobileLandscape        :{ type: 'string', default: '' },
		paddingLeftTablet                 :{ type: 'string', default: '' },
		paddingLeftTabletLandscape        :{ type: 'string', default: '' },
		paddingLeftTabletPro              :{ type: 'string', default: '' },
		paddingLeftTabletProLandscape     :{ type: 'string', default: '' },
		paddingLeftDesktop                :{ type: 'string', default: '' },
		
		paddingRightMobile                 :{ type: 'string', default: '' },
		paddingRightMobileLandscape        :{ type: 'string', default: '' },
		paddingRightTablet                 :{ type: 'string', default: '' },
		paddingRightTabletLandscape        :{ type: 'string', default: '' },
		paddingRightTabletPro              :{ type: 'string', default: '' },
		paddingRightTabletProLandscape     :{ type: 'string', default: '' },
		paddingRightDesktop                :{ type: 'string', default: '' },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function PaddingCoreButton(props){
	const _name = 'Padding';
	const _prefix = 'padding';
	
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
					label={__('Paddings', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<BoxControl values={boxValues}
					            onChange={(values) => updateCSSWithDimensions(values, props, _name, _prefix, EditorStyles) }
					            onUnitChange={(values) => updateCSSWithDimensions(values, props, _name, _prefix, EditorStyles) }
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
					label={__('Paddings', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default PaddingCoreButton;