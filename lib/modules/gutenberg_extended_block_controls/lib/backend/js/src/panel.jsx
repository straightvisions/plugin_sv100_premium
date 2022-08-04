import assign from 'lodash.assign';
import ExtendedControlComponents from './components.jsx';
import {getUniqueBlockId, isDuplicate, injectBlockListCSS, isSupported} from './helpers';
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TabPanel, Dashicon, Flex, FlexItem, DropdownMenu } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// register control panel
const withExtendedControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! isSupported( props.name ) ) {
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
			// replace old block ID with new one if block is a duplicate
			const newBlockId = getUniqueBlockId(props);
			
			// also do this for the parsed css
			let _parsedCSSString = parsedCSSString;
			let _parsedCSS = JSON.parse(parsedCSS);
		
			if(isDuplicate(props)){
				_parsedCSSString = parsedCSSString.replaceAll(blockId, newBlockId);
				
				Object.entries(_parsedCSS).forEach(([key, value]) => {
					_parsedCSS[key] = value.replaceAll(blockId, newBlockId);
				});
				
			}
			
			_parsedCSS = JSON.stringify(_parsedCSS);
			
			setAttributes({ blockId: newBlockId, parsedCSSString: _parsedCSSString, parsedCSS: _parsedCSS });
		}else{
			// inject editor css
			injectBlockListCSS(props);
		}
		
		function settingsCopy(){
			navigator.clipboard.writeText(JSON.stringify(props)).then(() => {
				// Alert the user that the action took place.
				// Nobody likes hidden stuff being done under the hood!
				wp.data.dispatch('core/notices').createInfoNotice(
					'Settings copied to clipboard.',
					{id: 'sv100-premium'}
				);
			});
		}
		
		function settingsPaste(){
			navigator.clipboard.readText().then(
				(clipText) => {
					let _props = null;
					try {
						 _props = JSON.parse(clipText);
					} catch (e) {
						wp.data.dispatch('core/notices').createErrorNotice(
							'Pasted data is not a valid.',
							{id: 'sv100-premium'}
						);
					}
					
					if(_props !== null){
						props.setAttributes({_sv100_premium_block_pasted_props: _props})
					}
					
				});
				
		}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'SV100 Premium - Extended Controls', 'sv100_premium' ) }
						initialOpen={ true }
						className={'sv100-premium-extended-controls-panel'}
					>
						<Flex alignItems={"top"}>
							<FlexItem>
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
							</FlexItem>
							<FlexItem>
								<DropdownMenu
									icon={ "admin-tools" }
									controls={ [
										{
											title: 'Copy',
											onClick: () => settingsCopy(),
										},
										{
											title: 'Paste',
											onClick: () => settingsPaste(),
										},
								
									] }
								/>
								
							</FlexItem>
						</Flex>
						
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
	if ( ! isSupported( name ) ) {
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
			
			if ( ! isSupported( props.name ) ) {
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
//@todo move this function completely to the php block render function
const addCustomProps = ( props, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported( blockType.name ) ) {
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