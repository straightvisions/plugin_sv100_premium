import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from "../helpers";

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
		textAlignActive                 :{ type: 'boolean', default: false },
		textAlignMobile                 :{ type: 'string', default: '' },
		textAlignMobileLandscape        :{ type: 'string', default: '' },
		textAlignTablet                 :{ type: 'string', default: '' },
		textAlignTabletLandscape        :{ type: 'string', default: '' },
		textAlignTabletPro              :{ type: 'string', default: '' },
		textAlignTabletProLandscape     :{ type: 'string', default: '' },
		textAlignDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function TextAlign(props){
	const _name = 'TextAlign';
	const _prefix = 'textAlign';
	
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
					label={__('Text Alignment', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
				<PanelRow>
					<SelectControl
						value={ values[_prefix+currentResponsiveTab] }
						onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
						options={ [
							{ value: '', label: 'Select'},
							{ value: 'center', label: 'Center' },
							{ value: 'left', label: 'Left' },
							{ value: 'right', label: 'Right' },
						] }
					/>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Text Alignment', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default TextAlign;