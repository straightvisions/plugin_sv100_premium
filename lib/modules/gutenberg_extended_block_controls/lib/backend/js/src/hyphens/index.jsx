import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, optIn, optOut} from "../helpers";

const { Fragment } = wp.element;
const { PanelRow, ToggleControl, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const enableCustomControlOnBlocks = [
	'core/paragraph',
	'core/heading',
	'core/quote',
	'core/button',
	'core/subhead',
	'core/verse',
];

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		hyphensActive                 :{ type: 'boolean', default: false },
		hyphensMobile                 :{ type: 'string', default: '' },
		hyphensMobileLandscape        :{ type: 'string', default: '' },
		hyphensTablet                 :{ type: 'string', default: '' },
		hyphensTabletLandscape        :{ type: 'string', default: '' },
		hyphensTabletPro              :{ type: 'string', default: '' },
		hyphensTabletProLandscape     :{ type: 'string', default: '' },
		hyphensDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Hyphens(props){
	const _name = 'Hyphens';
	const _prefix = 'hyphens';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
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
					label={__('Hyphens', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optOut(props, {[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<SelectControl
						value={ values[_prefix+currentResponsiveTab] }
						onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
						options={ [
							{ value: '', label: 'Select'},
							{ value: 'none', label: 'None' },
							{ value: 'manual', label: 'Manual' },
							{ value: 'auto', label: 'Auto' },
							{ value: 'inherit', label: 'Inherit' },
						] }
					/>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Hyphens', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => optIn(props, {[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Hyphens;