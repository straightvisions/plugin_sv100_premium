import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSSWithDimensions, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl, __experimentalBoxControl } = wp.components;
const BoxControl = __experimentalBoxControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.margin.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		marginActive                    :{ type: 'boolean', default: false },
	
		marginTopMobile                 :{ type: 'string', default: '' },
		marginTopMobileLandscape        :{ type: 'string', default: '' },
		marginTopTablet                 :{ type: 'string', default: '' },
		marginTopTabletLandscape        :{ type: 'string', default: '' },
		marginTopTabletPro              :{ type: 'string', default: '' },
		marginTopTabletProLandscape     :{ type: 'string', default: '' },
		marginTopDesktop                :{ type: 'string', default: '' },
		
		marginBottomMobile                 :{ type: 'string', default: '' },
		marginBottomMobileLandscape        :{ type: 'string', default: '' },
		marginBottomTablet                 :{ type: 'string', default: '' },
		marginBottomTabletLandscape        :{ type: 'string', default: '' },
		marginBottomTabletPro              :{ type: 'string', default: '' },
		marginBottomTabletProLandscape     :{ type: 'string', default: '' },
		marginBottomDesktop                :{ type: 'string', default: '' },
		
		marginLeftMobile                 :{ type: 'string', default: '' },
		marginLeftMobileLandscape        :{ type: 'string', default: '' },
		marginLeftTablet                 :{ type: 'string', default: '' },
		marginLeftTabletLandscape        :{ type: 'string', default: '' },
		marginLeftTabletPro              :{ type: 'string', default: '' },
		marginLeftTabletProLandscape     :{ type: 'string', default: '' },
		marginLeftDesktop                :{ type: 'string', default: '' },
		
		marginRightMobile                 :{ type: 'string', default: '' },
		marginRightMobileLandscape        :{ type: 'string', default: '' },
		marginRightTablet                 :{ type: 'string', default: '' },
		marginRightTabletLandscape        :{ type: 'string', default: '' },
		marginRightTabletPro              :{ type: 'string', default: '' },
		marginRightTabletProLandscape     :{ type: 'string', default: '' },
		marginRightDesktop                :{ type: 'string', default: '' },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Margin(props){
	const _name = 'Margin';
	const _prefix = 'margin';
	
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
					label={__('Margins', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
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
					label={__('Margins', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Margin;