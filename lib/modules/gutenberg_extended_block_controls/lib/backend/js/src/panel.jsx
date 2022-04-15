import assign from 'lodash.assign';
import ExtendedControlComponents from './components.jsx';
import {getUniqueBlockId, isDuplicate} from './helpers';
import injectBlockListCSS from "./injectBlockListCSS";
import EditorStyles from "./spacing/editor-styles";
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TabPanel, Dashicon } = wp.components;
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
				blockId,
				currentResponsiveTab,
				parsedCSSString,
				parsedCSS,
			},
			setAttributes,
			} = props;
	console.log(isDuplicate(props));
		if(blockId === '' || typeof blockId === 'undefined' || isDuplicate(props) === true){
			setAttributes({ blockId: getUniqueBlockId(props) });
		}
		
		console.log('Panel');
		// add css to frontend css attribute
		if(blockId !== '' && typeof blockId !== 'undefined'){
			injectBlockListCSS(props, setAttributes);
		}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'SV100 Premium - Extended Controls', 'sv100_premium' ) }
						initialOpen={ true }
					>
						<TabPanel
							className='sv100-premium-panelbody'
							tabs={[
								
								{
									name: "Mobile",
									title: <Dashicon icon="smartphone" />,
									className:'tab-icon',
								},
								
								{
									name: "MobileLandscape",
									title: <Dashicon icon="smartphone" style={{transform: 'rotate(90deg)'}}/>,
									className:'tab-icon',
								},
								
								{
									name: "Tablet",
									title: <Dashicon icon="tablet" />,
									className:'tab-icon',
								},
								
								{
									name: "TabletLandscape",
									title: <Dashicon icon="tablet" style={{transform: 'rotate(90deg)'}}/>,
									className:'tab-icon',
								},
								
								{
									name: "TabletPro",
									title: <Dashicon icon="tablet" style={{color: 'red'}}/>,
									className:'tab-icon',
								},
								
								{
									name: "TabletProLandscape",
									title: <Dashicon icon="tablet" style={{transform: 'rotate(90deg)',color: 'red'}}/>,
									className:'tab-icon',
								},
								
								{
									name: "Desktop",
									title: <Dashicon icon="desktop" />,
									className:'tab-icon',
								}
								
								
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

// register custom attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableExtendedControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	settings.attributes = assign( settings.attributes, {
		blockId:{ type: 'string' },
		parsedCSS:{ type: 'object', default: {} },
		parsedCSSString:{ type: 'string', default: '' },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// add block id
const withClientIdClassName  = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			
			if ( ! enableExtendedControlOnBlocks.includes( props.name ) ) {
				return (
					<BlockListBlock { ...props } />
				);
			}
			
			return (
				<BlockListBlock
					{ ...props }
					className={ 'block-'+props.attributes.blockId }
				/>
			);
		}
	},
	'withCustomClassName'
);

wp.hooks.addFilter('editor.BlockListBlock', 'sv100-premium/gutenberg-extended-block-controls', withClientIdClassName );

// add blockid-class to props
const addCustomProps = ( props, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableExtendedControlOnBlocks.includes( blockType.name ) ) {
		return props;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	assign( props, { className : props.className + ' block-'+attributes.blockId } );
	
	return props;
};

addFilter( 'blocks.getSaveContent.extraProps', 'sv100-premium/gutenberg-extended-block-controls', addCustomProps );

/*
@todo:
generateCSS.js überarbeitet, dass alle breakpoints correkt unterstützt werden,
evtl. die icons umkehren, da wir logisch ja mit 0px min width beginnen -> frage ist, ob das für den nutzer
auch klar ist???

frontend css output
 */