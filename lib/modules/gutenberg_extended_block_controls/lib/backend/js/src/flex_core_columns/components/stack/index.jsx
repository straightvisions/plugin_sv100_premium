import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS, isSupported} from "../../../helpers";

const { Fragment } = wp.element;
const { ToggleControl  } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'StackFlex';
const _prefix = 'stack';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		stackMobile                 :{ type: 'boolean', default: true, },
		stackMobileLandscape        :{ type: 'boolean', default: false, },
		stackTablet                 :{ type: 'boolean', default: false, },
		stackTabletLandscape        :{ type: 'boolean', default: false, },
		stackTabletPro              :{ type: 'boolean', default: false, },
		stackTabletProLandscape     :{ type: 'boolean', default: false, },
		stackDesktop                :{ type: 'boolean', default: false, },
		
		stackReverseMobile                 :{ type: 'boolean', default: false, },
		stackReverseMobileLandscape        :{ type: 'boolean', default: false, },
		stackReverseTablet                 :{ type: 'boolean', default: false, },
		stackReverseTabletLandscape        :{ type: 'boolean', default: false, },
		stackReverseTabletPro              :{ type: 'boolean', default: false, },
		stackReverseTabletProLandscape     :{ type: 'boolean', default: false, },
		stackReverseDesktop                :{ type: 'boolean', default: false, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function StackFlex(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	return(
		<Fragment>
			<ToggleControl  label={__('Stack Columns', 'sv100_premium')} value={values[_prefix+currentResponsiveTab]}
			              onChange={(val) => updateCSS(val, props, _name, _prefix, EditorStyles) } checked={props.attributes[_prefix+currentResponsiveTab]}
			/>
			<ToggleControl  label={__('Reverse Order', 'sv100_premium')} value={values[_prefix+'Reverse'+currentResponsiveTab]}
			                onChange={(val) => updateCSS(val, props, _name, _prefix+'Reverse', EditorStyles) } checked={props.attributes[_prefix+'Reverse'+currentResponsiveTab]}
			/>
		</Fragment>
	);
	
}

export default StackFlex;