
import EditorStyles from './editor-styles';
import {updateCSS, isSupported} from "../../../helpers";

const { Fragment } = wp.element;
const { SelectControl  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;


const _name = 'JustifyFlex';
const _prefix = 'justify';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		justifyActive                 :{ type: 'boolean', default: false },
		justifyMobile                 :{ type: 'string', default: '' },
		justifyMobileLandscape        :{ type: 'string', default: '' },
		justifyTablet                 :{ type: 'string', default: '' },
		justifyTabletLandscape        :{ type: 'string', default: '' },
		justifyTabletPro              :{ type: 'string', default: '' },
		justifyTabletProLandscape     :{ type: 'string', default: '' },
		justifyDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function JustifyFlex(props){
	
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
				label={__('Justify Content', 'sv100_premium')}
				value={ values[_prefix+currentResponsiveTab] }
				onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
				options={ [
					{ value: '', label: 'Select'},
					{ value: 'center', label: 'Center' },
					{ value: 'flex-start', label: 'Flex Start' },
					{ value: 'flex-end', label: 'Flex End' },
					{ value: 'space-between', label: 'Space Between' },
					{ value: 'space-around', label: 'Space Around' },
				] }
			/>
		</Fragment>
	);
	
}

export default JustifyFlex;