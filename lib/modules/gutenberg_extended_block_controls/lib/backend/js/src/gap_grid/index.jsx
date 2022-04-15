import assign from 'lodash.assign';
import EditorStyles from './editor-styles';

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
		
		columnGapMobile                 :{ type: 'integer', default: 10, },
		columnGapMobileLandscape        :{ type: 'integer', default: 10, },
		columnGapTablet                 :{ type: 'integer', default: 10, },
		columnGapTabletLandscape        :{ type: 'integer', default: 10, },
		columnGapTabletPro              :{ type: 'integer', default: 10, },
		columnGapTabletProLandscape     :{ type: 'integer', default: 10, },
		columnGapDesktop                :{ type: 'integer', default: 10, },
		
		rowGapMobile                    :{ type: 'integer', default: 10, },
		rowGapMobileLandscape           :{ type: 'integer', default: 10, },
		rowGapTablet                    :{ type: 'integer', default: 10, },
		rowGapTabletLandscape           :{ type: 'integer', default: 10, },
		rowGapTabletPro                 :{ type: 'integer', default: 10, },
		rowGapTabletProLandscape        :{ type: 'integer', default: 10, },
		rowGapDesktop                   :{ type: 'integer', default: 10, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function gapGrid(props){
	const _name = 'gapGrid';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const {
		attributes: {
			columnGapDesktop,
			columnGapMobile,
			columnGapMobileLandscape,
			columnGapTablet,
			columnGapTabletLandscape,
			columnGapTabletPro,
			columnGapTabletProLandscape,
			rowGapDesktop,
			rowGapMobile,
			rowGapMobileLandscape,
			rowGapTablet,
			rowGapTabletLandscape,
			rowGapTabletPro,
			rowGapTabletProLandscape,
		},
		setAttributes,
	} = props;
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;
	
	let parsedCSS = props.attributes.parsedCSS;
	parsedCSS[_name] = EditorStyles(props);
	
	// add css to frontend css attribute
	setAttributes( { parsedCSS: parsedCSS } );

	return(
		<Fragment>
			<RangeControl label={__('Gap Column', 'sv100_premium')} value={values['columnGap'+currentResponsiveTab]}
              onChange={(val) => setAttributes({['columnGap'+currentResponsiveTab]: val})} min={0} max={500}
			/>
			<RangeControl label={__('Gap Row', 'sv100_premium')} value={values['rowGap'+currentResponsiveTab]}
			              onChange={(val) => setAttributes({['rowGap'+currentResponsiveTab]: val})} min={0} max={500}
			/>
		</Fragment>
	);
	
}

export default gapGrid;