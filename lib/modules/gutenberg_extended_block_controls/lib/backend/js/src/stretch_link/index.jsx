import assign from 'lodash.assign';
import {getUniqueBlockId, updateCSS, updateCSSWithDimensions} from "../helpers";
import EditorStyles from "../margin/editor-styles";

const { Fragment } = wp.element;
const { ToggleControl, __experimentalLinkControl , PanelRow, Popover} = wp.components;
const LinkControl = __experimentalLinkControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const enableCustomControlOnBlocks = [
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

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableCustomControlOnBlocks.includes( name ) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		stretchLink :{ type: 'boolean', default: false, },
		stretchLinkURL :{ type: 'string', default: '', },
		stretchLinkText :{ type: 'string', default: '', },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function StretchLink(props){
	const _name = 'StretchLink';
	const _prefix = 'stretchLink';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	if(typeof values[_prefix + 'URL'] === 'undefined'){
		values[_prefix + 'URL'] = 'https://google.com';
	}
console.log(<LinkControl/>);
	if(values[_prefix] === true){
		return(
			<Fragment>
				<ToggleControl  label={__('StretchLink', 'sv100_premium')} value={values[_prefix]}
				                checked={values[_prefix]}
				                onChange={ (val) => props.setAttributes({ stretchLink: val }) }
				/>
				<PanelRow>
					<Popover
						position="bottom center"
					>
						<LinkControl
						
						/>
					</Popover>
				</PanelRow>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl  label={__('StretchLink', 'sv100_premium')} value={values[_prefix]}
				                checked={props.attributes[_prefix]}
				                onChange={ (val) => props.setAttributes({ stretchLink: val }) }
				/>
			</Fragment>
		);
	}
	
	
}

export default StretchLink;