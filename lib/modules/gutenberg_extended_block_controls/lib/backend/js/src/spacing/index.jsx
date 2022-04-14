import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;


const enableSpacingControlOnBlocks = [
	'core/columns',
];

const addSpacingControlAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnBlocks.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		gap: {
			type: 'integer',
			default: 0,
			attribute: 'gap',
		},
	} );

	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addSpacingControlAttribute );

/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { gap } = props.attributes;
		
		return (
			<Fragment>
				<BlockEdit { ...props }/>
				<InspectorControls>
					<PanelBody
						title={ __( 'Extended Controls', 'straightvisions' ) }
						initialOpen={ true }
					>
						
						<RangeControl
							label={__('Spacing', 'straightvisions')}
							value={gap}
							onChange={(val) => props.setAttributes({gap: val})}
							min={0}
							max={500}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSpacingControl' );

addFilter( 'editor.BlockEdit', 'sv100-premium/gutenberg-extended-block-controls', withSpacingControl );


const withInlineStyle = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			
			if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
				return (
					<BlockListBlock { ...props } />
				);
			}
			
			return (
				<BlockListBlock
					{ ...props }
					wrapperProps={{style: {gap: props.attributes.gap} }}
				/>
			);
		}
	},
	'withInlineStyle'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'sv100-premium/gutenberg-extended-block-controls',
	withInlineStyle
);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnBlocks.includes( blockType.name ) ) {
		return saveElementProps;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	assign( saveElementProps, { style: { 'gap':attributes.gap } } );

	return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'sv100-premium/gutenberg-extended-block-controls', addSpacingExtraProps );
