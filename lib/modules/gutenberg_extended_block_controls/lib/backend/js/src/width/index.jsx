import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const { PanelBody, PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.width.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		widthActive                 :{ type: 'boolean', default: false },
		widthMobile                 :{ type: 'string', default: '' },
		widthMobileLandscape        :{ type: 'string', default: '' },
		widthTablet                 :{ type: 'string', default: '' },
		widthTabletLandscape        :{ type: 'string', default: '' },
		widthTabletPro              :{ type: 'string', default: '' },
		widthTabletProLandscape     :{ type: 'string', default: '' },
		widthDesktop                :{ type: 'string', default: '' },
		
		widthMinMobile                 :{ type: 'string', default: '' },
		widthMinMobileLandscape        :{ type: 'string', default: '' },
		widthMinTablet                 :{ type: 'string', default: '' },
		widthMinTabletLandscape        :{ type: 'string', default: '' },
		widthMinTabletPro              :{ type: 'string', default: '' },
		widthMinTabletProLandscape     :{ type: 'string', default: '' },
		widthMinDesktop                :{ type: 'string', default: '' },
		
		widthMaxMobile                 :{ type: 'string', default: '' },
		widthMaxMobileLandscape        :{ type: 'string', default: '' },
		widthMaxTablet                 :{ type: 'string', default: '' },
		widthMaxTabletLandscape        :{ type: 'string', default: '' },
		widthMaxTabletPro              :{ type: 'string', default: '' },
		widthMaxTabletProLandscape     :{ type: 'string', default: '' },
		widthMaxDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Width(props){
	const _name = 'Width';
	const _prefix = 'width';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Width', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<PanelBody>
					<PanelRow>
						<UnitControl
							label={__('Val', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Min', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+'Min'+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Min', EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Min', EditorStyles) } }
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Max', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+'Max'+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Max', EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Max', EditorStyles) } }
						/>
					</PanelRow>
				</PanelBody>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Width', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Width;