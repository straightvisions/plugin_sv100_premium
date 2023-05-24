import GapFlex from './components/gap';
import StackFlex from './components/stack';
import WrapFlex from './components/wrap';
import JustifyFlex from './components/justify';
import AlignFlex from './components/align';
import {
	addClassNames,
	lowercase,
	optIn,
	optOut,
	removeClassNames,
	updateCSS,
	updateCSSWithDimensionsCorners,
	isSupported
} from "../helpers";
import gapEditorStyles from "./components/gap/editor-styles";
import stackEditorStyles from "./components/stack/editor-styles";
import wrapEditorStyles from "./components/stack/editor-styles";
import justifyEditorStyles from "./components/justify/editor-styles";
import alignEditorStyles from "./components/align/editor-styles";

const { Fragment } = wp.element;
const { ToggleControl, PanelRow, Tooltip  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'flexCoreColumns';
const _prefix = 'flexCoreColumns';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		flexCoreColumnsActive  :{ type: 'boolean', default: false, },
		flexCoreColumnsInit  :{ type: 'boolean', default: false, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function FlexCoreColumns(props){
	
	if ( ! isSupported(props.name, _name) ) {
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
		//@todo why no justify and wrap css here? looks like that would be buggy, but makes no sense?
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
							['wrapFlexActive']: val, // fake opt-in for sub modules
							['justifyFlexActive']: val, // fake opt-in for sub modules
							['alignFlexActive']: val, // fake opt-in for sub modules
							_classNamesList: list
						});
					}}
					help={__('This option forces flex behaviour on the selected columns block and only works if enabled constantly. Native stacking will not work with this option enabled.', 'sv100_premium')}
				/>
				<GapFlex {...props}/>
				<StackFlex {...props}/>
				<WrapFlex {...props}/>
				<JustifyFlex {...props}/>
				<AlignFlex {...props}/>
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
							['wrapFlexActive']: val, // fake opt-in for sub modules
							['justifyFlexActive']: val, // fake opt-in for sub modules
							['alignFlexActive']: val, // fake opt-in for sub modules
							_classNamesList: list
						});
					}}
				/>
				
			</Fragment>
		);
	}
	
}

export default FlexCoreColumns;