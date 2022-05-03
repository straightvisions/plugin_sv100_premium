import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from '../helpers';
const { Fragment } = wp.element;
const { RangeControl } = wp.components;
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
		gapMobile                 :{ type: 'integer', default: 10, },
		gapMobileLandscape        :{ type: 'integer', default: 10, },
		gapTablet                 :{ type: 'integer', default: 10, },
		gapTabletLandscape        :{ type: 'integer', default: 10, },
		gapTabletPro              :{ type: 'integer', default: 10, },
		gapTabletProLandscape     :{ type: 'integer', default: 10, },
		gapDesktop                :{ type: 'integer', default: 10, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function GapFlex(props){
	const _name = 'gapFlex';
	const _prefix = 'gap';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
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

export default GapFlex;