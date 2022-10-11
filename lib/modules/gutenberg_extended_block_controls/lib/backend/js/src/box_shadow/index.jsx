
import {optIn, optOut, isSupported} from "../helpers";
import attributes from "./attributes.js";
import BoxShadowFragment from "./components/box_shadow";

const { Fragment } = wp.element;
const {
	ToggleControl,
} = wp.components;

const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'BoxShadow';
const _prefix = 'boxShadow';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, settings.attributes, attributes);
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function BoxShadow(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	
	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Box Shadow', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<BoxShadowFragment {...props} num={1} />
				<BoxShadowFragment {...props} num={2} />
				
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Box Shadow', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
}

export default BoxShadow;