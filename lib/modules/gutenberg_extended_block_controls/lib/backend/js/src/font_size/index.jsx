import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut, isSupported} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'FontSize';
const _prefix = 'fontSize';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		fontSizeActive                 :{ type: 'boolean', default: false },
		fontSizeMobile                 :{ type: 'string', default: '' },
		fontSizeMobileLandscape        :{ type: 'string', default: '' },
		fontSizeTablet                 :{ type: 'string', default: '' },
		fontSizeTabletLandscape        :{ type: 'string', default: '' },
		fontSizeTabletPro              :{ type: 'string', default: '' },
		fontSizeTabletProLandscape     :{ type: 'string', default: '' },
		fontSizeDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function FontSize(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	console.log(props.attributes);
	if(typeof props.attributes._sv100_premium_block_pasted_props !== 'undefined' && typeof props.attributes._sv100_premium_block_pasted_props.attributes.fontSizeActive !== 'undefined'){
		let _props = props.attributes._sv100_premium_block_pasted_props;
		props.attributes.fontSizeActive = _props.attributes.fontSizeActive ? _props.attributes.fontSizeActive : false;
		props.attributes.fontSizeActive = _props.attributes.fontSizeMobile ? _props.attributes.fontSizeMobile : '';
		
		delete _props.attributes['fontSizeActive'];
		delete _props.attributes['fontSizeMobile'];
		
		props.attributes._sv100_premium_block_pasted_props = _props;
		const _new = Object.assign(_new_props, {_sv100_premium_block_pasted_props: _props});
		console.log('update');
		console.log(_new);
		props.setAttributes(_new);
		
		updateCSS(val, props, _name, _prefix, EditorStyles)
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Font Size', 'sv100_premium')}
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
					label={__('Font Size', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default FontSize;