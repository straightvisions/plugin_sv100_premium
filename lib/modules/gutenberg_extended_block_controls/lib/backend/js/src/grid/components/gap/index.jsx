import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {lowercase, updateCSS, isSupported} from '../../../helpers';
const { Fragment } = wp.element;
const { RangeControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'GridGap';
const _prefix = 'gridGap';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		gridGapMobile                 :{ type: 'integer', default: 10, },
		gridGapMobileLandscape        :{ type: 'integer', default: 10, },
		gridGapTablet                 :{ type: 'integer', default: 10, },
		gridGapTabletLandscape        :{ type: 'integer', default: 10, },
		gridGapTabletPro              :{ type: 'integer', default: 10, },
		gridGapTabletProLandscape     :{ type: 'integer', default: 10, },
		gridGapDesktop                :{ type: 'integer', default: 10, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function GridGap(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	return(
		<Fragment>
			<RangeControl label={__('Gap', 'sv100_premium')} value={values[_prefix+currentResponsiveTab]}
			              onChange={(val) => updateCSS(val, props, _name, _prefix, EditorStyles) } min={0} max={500}
			/>
		</Fragment>
	);
	
}

export default GridGap;