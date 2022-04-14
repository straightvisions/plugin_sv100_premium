import assign from 'lodash.assign';
import ExtendedControlComponents from './components.jsx';
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TabPanel, Dashicon, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// whitelist blocks
const enableExtendedControlOnBlocks = [
	'core/columns',
];

// register control panel
const withExtendedControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableExtendedControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const {
			attributes: {
				currentResponsiveTab,
			},
			setAttributes,
			} = props;
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'SV100 Premium - Extended Controls', 'sv100_premium' ) }
						initialOpen={ true }
					>
						
						<TabPanel
							className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
							activeClass="active-tab"
							tabs={[
								{
									name: "Desktop",
									title: <Dashicon icon="desktop" />,
									className:
										" responsive-desktop-tab  responsive-responsive-tabs",
								},
								{
									name: "TabletPro",
									title: <Dashicon icon="tablet" style={{color: 'red'}}/>,
									className:
										" responsive-desktop-tab  responsive-responsive-tabs",
								},
								{
									name: "TabletProLandscape",
									title: <Dashicon icon="tablet" style={{transform: 'rotate(90deg)',color: 'red'}}/>,
									className:
										" responsive-desktop-tab  responsive-responsive-tabs",
								},
								{
									name: "Tablet",
									title: <Dashicon icon="tablet" />,
									className:
										" responsive-tablet-tab  responsive-responsive-tabs",
								},
								{
									name: "TabletLandscape",
									title: <Dashicon icon="tablet" style={{transform: 'rotate(90deg)'}}/>,
									className:
										" responsive-tablet-tab  responsive-responsive-tabs",
								},
								{
									name: "Mobile",
									title: <Dashicon icon="smartphone" />,
									className:
										" responsive-mobile-tab  responsive-responsive-tabs",
								},
								{
									name: "MobileLandscape",
									title: <Dashicon icon="smartphone" style={{transform: 'rotate(90deg)'}}/>,
									className:
										" responsive-mobile-tab  responsive-responsive-tabs",
								},
							]}
						>
							{(tab) => {
								let output = (
									setAttributes({currentResponsiveTab: tab.name})
								);
								
								return <div>{output}</div>;
							}}
						</TabPanel>
						<Fragment>
							<ExtendedControlComponents { ...props }/>
						</Fragment>
					</PanelBody>
				</InspectorControls>
				<BlockEdit { ...props }/>
			</Fragment>
		);
	};
}, 'withExtendedControl' );

addFilter( 'editor.BlockEdit', 'sv100-premium/gutenberg-extended-block-controls', withExtendedControl );

const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableExtendedControlOnBlocks.includes( blockType.name ) ) {
		return saveElementProps;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	assign( saveElementProps, { style: { 'gap':attributes.gap } } );
	
	return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'sv100-premium/gutenberg-extended-block-controls', addSpacingExtraProps );
