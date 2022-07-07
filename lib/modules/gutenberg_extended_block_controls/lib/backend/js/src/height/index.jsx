import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut, isSupported} from "../helpers";

const { Fragment } = wp.element;
const { PanelBody, PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'Height';
const _prefix = 'height';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		heightActive                 :{ type: 'boolean', default: false },
		heightMobile                 :{ type: 'string', default: '' },
		heightMobileLandscape        :{ type: 'string', default: '' },
		heightTablet                 :{ type: 'string', default: '' },
		heightTabletLandscape        :{ type: 'string', default: '' },
		heightTabletPro              :{ type: 'string', default: '' },
		heightTabletProLandscape     :{ type: 'string', default: '' },
		heightDesktop                :{ type: 'string', default: '' },
		
		heightMinMobile                 :{ type: 'string', default: '' },
		heightMinMobileLandscape        :{ type: 'string', default: '' },
		heightMinTablet                 :{ type: 'string', default: '' },
		heightMinTabletLandscape        :{ type: 'string', default: '' },
		heightMinTabletPro              :{ type: 'string', default: '' },
		heightMinTabletProLandscape     :{ type: 'string', default: '' },
		heightMinDesktop                :{ type: 'string', default: '' },
		
		heightMaxMobile                 :{ type: 'string', default: '' },
		heightMaxMobileLandscape        :{ type: 'string', default: '' },
		heightMaxTablet                 :{ type: 'string', default: '' },
		heightMaxTabletLandscape        :{ type: 'string', default: '' },
		heightMaxTabletPro              :{ type: 'string', default: '' },
		heightMaxTabletProLandscape     :{ type: 'string', default: '' },
		heightMaxDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Height(props){
	
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
					label={__('Height', 'sv100_premium')}
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
					label={__('Height', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Height;