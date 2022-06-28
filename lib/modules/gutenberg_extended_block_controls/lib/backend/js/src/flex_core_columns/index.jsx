import assign from 'lodash.assign';
import GapFlex from './components/gap';
import StackFlex from './components/stack';
import {
	addClassNames,
	lowercase,
	optIn,
	optOut,
	removeClassNames,
	updateCSS,
	updateCSSWithDimensionsCorners
} from "../helpers";
import gapEditorStyles from "./components/gap/editor-styles";
import stackEditorStyles from "./components/stack/editor-styles";

const { Fragment } = wp.element;
const { ToggleControl, PanelRow, Tooltip  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const Config = js_sv100_premium_gutenberg_extended_block_controls_scripts_controls.config;
const enableCustomControlOnBlocks = Config.flexCoreColumns.blocks;

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		flexCoreColumnsActive  :{ type: 'boolean', default: false, },
		flexCoreColumnsInit  :{ type: 'boolean', default: false, },

	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function FlexCoreColumns(props){
	const _name = 'flexCoreColumns';
	const _prefix = 'flexCoreColumns';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	// initialise default values -------------------------------------------------
	if(values[_prefix+'Active'] === true && values.flexCoreColumnsInit === false){
		// move this later to a global function
		const attr = props.attributes;
		
		attr.parsedCSS = JSON.parse(attr.parsedCSS);
		// parse sub module CSS
		attr.parsedCSS['GapFlex'] = gapEditorStyles(attr, props.name);
		attr.parsedCSS['StackFlex'] = stackEditorStyles(attr, props.name);
		//collapse css objects
		let css = '';
		Object.keys( attr.parsedCSS ).map(function(key, index) {
			if(attr[lowercase(key) + 'Active'] === true){
				css += attr.parsedCSS[key];
			}
		});
		
		// update properties for rerender and injection
		props.setAttributes({
			parsedCSS: JSON.stringify(attr.parsedCSS),
			parsedCSSString: css, // this gets injected
			flexCoreColumnsInit: true,
		});
	}
	// initialise default values -------------------------------------------------
	
	if(values[_prefix+'Active'] === true){
		
		return(
			<Fragment>
				<ToggleControl
					label={__('Columns Control', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => {
						const list = removeClassNames(props, ['sv100-premium-block-core-mod-flex']);
						optOut(props, {
							[_prefix+'Active']: val,
							['gapFlexActive']: val, // fake opt-in for sub modules
							['stackFlexActive']: val, // fake opt-in for sub modules
							_classNamesList: list
						});
					}}
					help={__('This option forces flex behaviour on the selected columns block and only works if enabled constantly. Native stacking will not work with this option enabled.', 'sv100_premium')}
				/>
				<GapFlex {...props}/>
				<StackFlex {...props}/>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Columns Control', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => {
						const list = addClassNames(props, ['sv100-premium-block-core-mod-flex']);
						optIn(props, {
							[_prefix+'Active']: val,
							['gapFlexActive']: val, // fake opt-in for sub modules
							['stackFlexActive']: val, // fake opt-in for sub modules
							_classNamesList: list
						});
					}}
				/>
				
			</Fragment>
		);
	}
	
}

export default FlexCoreColumns;