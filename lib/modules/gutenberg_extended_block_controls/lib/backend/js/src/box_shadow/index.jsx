import assign from 'lodash.assign';
import {optIn, optOut} from "../helpers";
import attributes from "./attributes.js";
import BoxShadowFragment from "./components/box_shadow";

const { Fragment } = wp.element;
const {
	ToggleControl,
} = wp.components;

const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.boxShadow.blocks;

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
function BoxShadow(props){
	const _name = 'BoxShadow';
	const _prefix = 'boxShadow';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
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