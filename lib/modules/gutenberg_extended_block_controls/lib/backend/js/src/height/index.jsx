import assign from 'lodash.assign';
import EditorStyles from './editor-styles';
import {updateCSS} from "../helpers";

const { Fragment } = wp.element;
const { PanelBody, PanelRow, ToggleControl,  __experimentalUnitControl } = wp.components;
const UnitControl =  __experimentalUnitControl;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const enableCustomControlOnBlocks = [
	'core/paragraph',
	'core/image',
	'core/heading',
	'core/gallery',
	'core/list',
	'core/quote',
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
		heightActive                 :{ type: 'boolean', default: false },
		heightMobile                 :{ type: 'string', default: '' },
		heightMobileLandscape        :{ type: 'string', default: '' },
		heightTablet                 :{ type: 'string', default: '' },
		heightTabletLandscape        :{ type: 'string', default: '' },
		heightTabletPro              :{ type: 'string', default: '' },
		heightTabletProLandscape     :{ type: 'string', default: '' },
		heightDesktop                :{ type: 'string', default: '' },
		
		heightMinMobile                 :{ type: 'string', default: '' },
		heightMinMobileLandscape        :{ type: 'string', default: '' },
		heightMinTablet                 :{ type: 'string', default: '' },
		heightMinTabletLandscape        :{ type: 'string', default: '' },
		heightMinTabletPro              :{ type: 'string', default: '' },
		heightMinTabletProLandscape     :{ type: 'string', default: '' },
		heightMinDesktop                :{ type: 'string', default: '' },
		
		heightMaxMobile                 :{ type: 'string', default: '' },
		heightMaxMobileLandscape        :{ type: 'string', default: '' },
		heightMaxTablet                 :{ type: 'string', default: '' },
		heightMaxTabletLandscape        :{ type: 'string', default: '' },
		heightMaxTabletPro              :{ type: 'string', default: '' },
		heightMaxTabletProLandscape     :{ type: 'string', default: '' },
		heightMaxDesktop                :{ type: 'string', default: '' },
		
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function Height(props){
	const _name = 'Height';
	const _prefix = 'height';
	
	if ( ! enableCustomControlOnBlocks.includes( props.name ) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	const currentResponsiveTab = props.attributes.currentResponsiveTab;

	if(values[_prefix+'Active'] === true){
		return(
			<Fragment>
				<ToggleControl
					label={__('Height', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
				<PanelBody>
					<PanelRow>
						<UnitControl
							label={__('Val', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix, EditorStyles) } }
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Min', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+'Min'+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Min', EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Min', EditorStyles) } }
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Max', 'sv100_premium')}
							labelPosition={'side'}
							value={ values[_prefix+'Max'+currentResponsiveTab] }
							onChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Max', EditorStyles) } }
							onUnitChange={ ( val ) => { updateCSS(val, props, _name, _prefix+'Max', EditorStyles) } }
						/>
					</PanelRow>
				</PanelBody>
			</Fragment>
		);
	}else{
		return(
			<Fragment>
				<ToggleControl
					label={__('Height', 'sv100_premium')}
					checked={values[_prefix+'Active']}
					onChange={(val) => props.setAttributes({[_prefix+'Active']: val})}
				/>
			</Fragment>
		);
	}
	
	
}

export default Height;