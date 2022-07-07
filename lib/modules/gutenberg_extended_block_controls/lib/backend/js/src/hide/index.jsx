import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, isSupported} from "../helpers";

const { Fragment } = wp.element;
const { ToggleControl  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'Hide';
const _prefix = 'hide';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		hideMobile                 :{ type: 'boolean', default: false, },
		hideMobileLandscape        :{ type: 'boolean', default: false, },
		hideTablet                 :{ type: 'boolean', default: false, },
		hideTabletLandscape        :{ type: 'boolean', default: false, },
		hideTabletPro              :{ type: 'boolean', default: false, },
		hideTabletProLandscape     :{ type: 'boolean', default: false, },
		hideDesktop                :{ type: 'boolean', default: false, },
		hideActive                 :{ type: 'boolean', default: true, }, // fake opt-in
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Hide(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	return(
		<Fragment>
			<ToggleControl  label={__('Hide', 'sv100_premium')} value={values[_prefix+currentResponsiveTab]}
			              onChange={(val) => updateCSS(val, props, _name, _prefix, EditorStyles) } checked={props.attributes[_prefix+currentResponsiveTab]}
			/>
		</Fragment>
	);
	
}

export default Hide;