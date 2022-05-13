import assign from 'lodash.assign';
import ExtendedControlComponents from './components.jsx';
import {getUniqueBlockId, isDuplicate, injectBlockListCSS} from './helpers';
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TabPanel, Dashicon, Button } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// whitelist blocks (could be replace by a generation function
const enableExtendedControlOnBlocks = [
	'core/paragraph',
	'core/image',
	'core/heading',
	'core/gallery',
	'core/list',
	'core/quote',
	'core/shortcode',
	'core/archives',
	'core/audio',
	'core/button',
	'core/buttons',
	'core/calendar',
	'core/categories',
	'core/code',
	'core/columns',
	'core/column',
	'core/cover',
	'core/embed',
	'core/file',
	'core/group',
	'core/freeform',
	'core/html',
	'core/media-text',
	'core/latest-comments',
	'core/latest-posts',
	'core/missing',
	'core/more',
	'core/nextpage',
	'core/preformatted',
	'core/pullquote',
	'core/rss',
	'core/search',
	'core/separator',
	'core/block',
	'core/social-links',
	'core/social-link',
	'core/spacer',
	'core/subhead',
	'core/table',
	'core/tag-cloud',
	'core/text-columns',
	'core/verse',
	'core/video'
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
	
		// check and generate unique persistent block id (clientId is not persistent!)
		if(blockId === '' || typeof blockId === 'undefined' || isDuplicate(props) === true){
			setAttributes({ blockId: getUniqueBlockId(props) });
		}else{
			// inject editor css
			injectBlockListCSS(props);
		}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'SV100 Premium - Extended Controls', 'sv100_premium' ) }
						initialOpen={ true }
						className={'sv100-premium-extended-controls-panel'}
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
							{/*
							<Button variant='secondary' isSmall={true} text={'Rebuild CSS'}
							        onClick={() => props.setAttributes({_regenerateCSS: true})}
							        isBusy={props.attributes._regenerateCSS}
							        isDisabled={props.attributes._regenerateCSS}
							/>
							*/}
							
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
		parsedCSS:{ type: 'string', default: '{}' },
		parsedCSSString:{ type: 'string', default: '' },
		_classNamesList: {type: 'array', default: []},
		_regenerateCSS: {type: 'boolean', default: false},
		_regenerateCSSList: {type: 'array', default: []},
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
			
			// old way
			let classNames = 'sv100-premium-block-core-'+props.attributes.blockId;

			if(typeof props.attributes.stretchLink !== 'undefined' && props.attributes.stretchLink === true){
				classNames += ' sv100-premium-extended-controls-stretch-link';
			}
			
			// new way
			const _classNamesList = typeof props.attributes._classNamesList !== 'undefined' ? props.attributes._classNamesList : [];
			
			for(let i = 0; i < _classNamesList.length; i++){
				classNames += ' ' + _classNamesList[i];
			}
			
			return (
				<BlockListBlock
					{ ...props }
					className={ classNames }
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
	if(typeof attributes.blockId !== 'undefined'){
		let classNames = typeof props.className === 'undefined' ? '' : props.className; // paragraphs, list, headings
		
		// old way
		if(classNames === ''){
			classNames += 'sv100-premium-block-core-'+attributes.blockId;
		}else{
			classNames += ' sv100-premium-block-core-'+attributes.blockId;
		}
		
		if(typeof attributes.stretchLink !== 'undefined' && attributes.stretchLink === true){
			classNames += ' sv100-premium-extended-controls-stretch-link';
		}
		
		// new way
		const _classNamesList = typeof attributes._classNamesList !== 'undefined' ? attributes._classNamesList : [];
		
		for(let i = 0; i < _classNamesList.length; i++){
			classNames += ' ' + _classNamesList[i];
		}
	
		assign( props, { className : classNames  } );
	}
	
	return props;
};

addFilter( 'blocks.getSaveContent.extraProps', 'sv100-premium/gutenberg-extended-block-controls', addCustomProps );