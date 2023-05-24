
import GridGap from './components/gap';
import GridOrder from './components/order';

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

const { Fragment } = wp.element;
const { ToggleControl, PanelRow, Tooltip  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'grid';
const _prefix = 'grid';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		gridActive  :{ type: 'boolean', default: false, },
		gridInit  :{ type: 'boolean', default: false, },

	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Grid(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	// initialise default values -------------------------------------------------
	if(values[_prefix+'Active'] === true && values.gridInit === false){
		// move this later to a global function
		const attr = props.attributes;
		
		attr.parsedCSS = JSON.parse(attr.parsedCSS);
		// parse sub module CSS
		attr.parsedCSS['Gap'] = gapEditorStyles(attr, props.name);
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
			gridInit: true,
		});
	}
	// initialise default values -------------------------------------------------
	
	if(values[_prefix+'Active'] === true){
		
		return(
			<Fragment>
				<ToggleControl
					label={__('Grid Control', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => {
						optOut(props, {
							[_prefix+'Active']: val,
							[_prefix+'GapActive']: val, // fake opt-in for sub modules
							[_prefix+'OrderActive']: val, // fake opt-in for sub modules
						});
					}}
					help={__('This option forces grid behaviour on the selected block and only works if enabled constantly. Native ordering will not work with this option enabled.', 'sv100_premium')}
				/>
				<GridGap {...props}/>
				<GridOrder {...props}/>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Grid Control', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => {
						const attr = {
							[_prefix+'Active']: val,
							[_prefix+'GapActive']: val, // fake opt-in for sub modules
							[_prefix+'OrderActive']: val, // fake opt-in for sub modules
						}
						optIn(props, attr);
					}}
				/>
				
			</Fragment>
		);
	}
	
}

export default Grid;