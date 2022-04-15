import assign from 'lodash.assign';
import EditorStyles from './editor-styles';

const { Fragment } = wp.element;
const { ToggleControl  } = wp.components;
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
		stackMobile                 :{ type: 'boolean', default: true, },
		stackMobileLandscape        :{ type: 'boolean', default: false, },
		stackTablet                 :{ type: 'boolean', default: false, },
		stackTabletLandscape        :{ type: 'boolean', default: false, },
		stackTabletPro              :{ type: 'boolean', default: false, },
		stackTabletProLandscape     :{ type: 'boolean', default: false, },
		stackDesktop                :{ type: 'boolean', default: false, },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function StackFlex(props){
	const _name = 'StackFlex';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const {
		attributes: {
			stackDesktop,
			stackMobile,
			stackMobileLandscape,
			stackTablet,
			stackTabletLandscape,
			stackTabletPro,
			stackTabletProLandscape,
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
			<ToggleControl  label={__('Stack Columns', 'sv100_premium')} value={values['gap'+currentResponsiveTab]}
			              onChange={(val) => setAttributes({['stack'+currentResponsiveTab]: val})} checked={props.attributes['stack'+currentResponsiveTab]}
			/>
		</Fragment>
	);
	
}

export default StackFlex;