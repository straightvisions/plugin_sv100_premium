import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {lowercase, updateCSS, isSupported, optOut} from '../../../helpers';
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'GridOrder';
const _prefix = 'gridOrder';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		gridOrderMobile                 :{ type: 'integer', default: '{}', },
		gridOrderMobileLandscape        :{ type: 'integer', default: '{}', },
		gridOrderTablet                 :{ type: 'integer', default: '{}', },
		gridOrderTabletLandscape        :{ type: 'integer', default: '{}', },
		gridOrderTabletPro              :{ type: 'integer', default: '{}', },
		gridOrderTabletProLandscape     :{ type: 'integer', default: '{}', },
		gridOrderDesktop                :{ type: 'integer', default: '{}', },
		gridOrderReverseMobile                 :{ type: 'bool', default: false, },
		gridOrderReverseMobileLandscape        :{ type: 'bool', default: false, },
		gridOrderReverseTablet                 :{ type: 'bool', default: false, },
		gridOrderReverseTabletLandscape        :{ type: 'bool', default: false, },
		gridOrderReverseTabletPro              :{ type: 'bool', default: false, },
		gridOrderReverseTabletProLandscape     :{ type: 'bool', default: false, },
		gridOrderReverseDesktop                :{ type: 'bool', default: false, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function GridOrder(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	return(
		<Fragment>
			<label>{__('Order (Experimental)', 'sv100_premium')}</label>
			<ToggleControl
				label={__('Reverse', 'sv100_premium')}
				checked={values[_prefix + 'Reverse' + currentResponsiveTab]}
				value={values[_prefix + 'Reverse' + currentResponsiveTab]}
				onChange={(val) => updateCSS(val, props, _name, _prefix + 'Reverse', EditorStyles)}
				help={__('This might not work as expected with multiple rows yet.', 'sv100_premium')}
			/>
			
		</Fragment>
	);
	
}

export default GridOrder;