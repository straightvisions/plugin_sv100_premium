import assign from 'lodash.assign';
import GapFlex from './components/gap';
import StackFlex from './components/stack';
import {addClassNames, removeClassNames, updateCSS, updateCSSWithDimensionsCorners} from "../helpers";

const { Fragment } = wp.element;
const { ToggleControl, PanelRow, Tooltip  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const enableCustomControlOnBlocks = [
	'core/columns',
];

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		flexCoreColumnsActive  :{ type: 'boolean', default: false, },

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
	console.log(values);
	if(values[_prefix+'Active'] === true){
		
		return(
			<Fragment>
				<ToggleControl
					label={__('Columns Control', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => {
						const list = removeClassNames(props, ['sv100-premium-block-core-mod-flex']);
						props.setAttributes({[_prefix+'Active']: val, _classNamesList: list});
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
						props.setAttributes({[_prefix+'Active']: val, _classNamesList: list});
					}}
				/>
				
			</Fragment>
		);
	}
	
}

export default FlexCoreColumns;