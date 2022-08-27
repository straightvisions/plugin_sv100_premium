
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut, isSupported} from "../helpers";

const { Fragment } = wp.element;
const { PanelBody, PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'Width';
const _prefix = 'width';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
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
	
	if ( ! isSupported(props.name, _name) ) {
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