
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut, isSupported} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'LineHeight';
const _prefix = 'lineHeight';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		lineHeightActive                 :{ type: 'boolean', default: false },
		lineHeightMobile                 :{ type: 'string', default: '' },
		lineHeightMobileLandscape        :{ type: 'string', default: '' },
		lineHeightTablet                 :{ type: 'string', default: '' },
		lineHeightTabletLandscape        :{ type: 'string', default: '' },
		lineHeightTabletPro              :{ type: 'string', default: '' },
		lineHeightTabletProLandscape     :{ type: 'string', default: '' },
		lineHeightDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function LineHeight(props){
	
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
					label={__('Line Height', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<UnitControl
						value={ values[_prefix+currentResponsiveTab] }
						onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
						onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
					/>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Line Height', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default LineHeight;