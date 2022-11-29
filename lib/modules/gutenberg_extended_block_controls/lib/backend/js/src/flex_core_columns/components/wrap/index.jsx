import EditorStyles from './editor-styles';
import {updateCSS, isSupported} from "../../../helpers";

const { Fragment } = wp.element;
const { SelectControl  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'WrapFlex';
const _prefix = 'wrapFlex';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		wrapFlexActive                 :{ type: 'boolean', default: false },
		wrapFlexMobile                 :{ type: 'string', default: '' },
		wrapFlexMobileLandscape        :{ type: 'string', default: '' },
		wrapFlexTablet                 :{ type: 'string', default: '' },
		wrapFlexTabletLandscape        :{ type: 'string', default: '' },
		wrapFlexTabletPro              :{ type: 'string', default: '' },
		wrapFlexTabletProLandscape     :{ type: 'string', default: '' },
		wrapFlexDesktop                :{ type: 'string', default: '' },

	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function WrapFlex(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	return(
		<Fragment>
			<SelectControl
				label={__('Wrap Columns', 'sv100_premium')}
				value={values[_prefix+currentResponsiveTab]}
				onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
				options={ [
					{ value: '', label: 'Select'},
					{ value: 'nowrap', label: 'nowrap' },
					{ value: 'wrap', label: 'wrap' },
					{ value: 'wrap-reverse', label: 'wrap-reverse' }
				] }
			/>
		
		</Fragment>
	);
	
}

export default WrapFlex;