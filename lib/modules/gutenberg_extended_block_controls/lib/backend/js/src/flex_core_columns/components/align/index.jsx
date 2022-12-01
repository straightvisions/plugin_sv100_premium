import EditorStyles from './editor-styles';
import {updateCSS, isSupported} from "../../../helpers";

const { Fragment } = wp.element;
const { SelectControl  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;


const _name = 'AlignFlex';
const _prefix = 'align';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		alignActive                 :{ type: 'boolean', default: false },
		alignMobile                 :{ type: 'string', default: '' },
		alignMobileLandscape        :{ type: 'string', default: '' },
		alignTablet                 :{ type: 'string', default: '' },
		alignTabletLandscape        :{ type: 'string', default: '' },
		alignTabletPro              :{ type: 'string', default: '' },
		alignTabletProLandscape     :{ type: 'string', default: '' },
		alignDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function AlignFlex(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	return(
		<Fragment>
			<SelectControl
				label={__('Align Items', 'sv100_premium')}
				value={ values[_prefix+currentResponsiveTab] }
				onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
				options={ [
					{ value: '', label: 'Select'},
					{ value: 'center', label: 'Center' },
					{ value: 'flex-start', label: 'Flex Start' },
					{ value: 'flex-end', label: 'Flex End' },
					{ value: 'stretch', label: 'stretch' },
				] }
			/>
		</Fragment>
	);
	
}

export default AlignFlex;