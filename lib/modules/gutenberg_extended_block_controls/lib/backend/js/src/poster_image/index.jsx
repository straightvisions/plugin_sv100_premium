import assign from 'lodash.assign';

const { Fragment } = wp.element;
const { PanelRow, ToggleControl, Button, BaseControl  } = wp.components;
const { MediaPlaceholder,MediaUpload, MediaUploadCheck, MediaReplaceFlow  } = wp.blockEditor;
const { useRef, useEffect } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

import {getBlockDocumentRoot, isSupported} from '../helpers.js';

const _name = 'PosterImage';
const _prefix = 'posterImage';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		posterImage                 :{ type: 'boolean', default: false, },
		posterImageURL              :{ type: 'string', default: '', },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function PosterImage(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	
	const posterImageButton = useRef();
	const videoPosterDescription = `video-block__poster-image-description-${ values.blockId }`;
	
	const _document = getBlockDocumentRoot(props);
	
	const videoChild = _document.querySelector('.sv100-premium-block-core-'+values.blockId+' video');

	// set / remove poster from block editor video block
	if(videoChild !== null && values.posterImageURL !== ''){
		videoChild.setAttribute('poster', values.posterImageURL);
	}
	
	if(videoChild !== null && values.posterImageURL === ''){
		videoChild.removeAttribute('poster');
	}
	
	if(values[_prefix] === true){
		return(
			<Fragment>
				<ToggleControl  label={__('Poster Image', 'sv100_premium')} value={values[_prefix]}
				                checked={values[_prefix]}
				                onChange={ (val) => props.setAttributes({ posterImage: val }) }
				/>
				<PanelRow>
					<MediaUploadCheck>
						<BaseControl className="editor-video-poster-control">
							<MediaUpload
								title={ __( 'Select poster image' ) }
								onSelect={ (image) => props.setAttributes( { posterImageURL : image.url } ) }
								allowedTypes={['image']}
								render={ ( { open } ) => (
									<Button
										variant="primary"
										onClick={ open }
										ref={ posterImageButton }
										aria-describedby={
											videoPosterDescription
										}
									>
										{ values.posterImageURL === ''
											? __( 'Select' )
											: __( 'Replace' ) }
									</Button>
								) }
							/>
							<p id={ videoPosterDescription } hidden>
								{ values.posterImageURL !== ''
									? sprintf(
										/* translators: %s: poster image URL. */
										__(
											'The current poster image url is %s'
										),
										values.posterImageURL
									)
									: __(
										'There is no poster image currently selected'
									) }
							</p>
							{ values.posterImageURL !== '' && (
								<Button
									onClick={ (image) => props.setAttributes( { posterImageURL : '' } ) }
									variant="tertiary"
								>
									{ __( 'Remove' ) }
								</Button>
							) }
						</BaseControl>
					</MediaUploadCheck>
				</PanelRow>
				
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl  label={__('Poster Image', 'sv100_premium')} value={values[_prefix]}
				                checked={values[_prefix]}
				                onChange={ (val) => props.setAttributes({ posterImage: val }) }
				/>
			</Fragment>
		);
	}
	
}

export default PosterImage;