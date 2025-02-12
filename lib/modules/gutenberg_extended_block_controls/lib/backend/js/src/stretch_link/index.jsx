
import {isSupported} from "../helpers";

const { Fragment } = wp.element;
const { ToggleControl , PanelRow, __experimentalInputControl: InputControl } = wp.components;
const {__experimentalLinkControl: LinkControl } = wp.blockEditor;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const _name = 'StretchLink';
const _prefix = 'stretchLink';

// register attributes
const addCustomControlAttributes = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! isSupported(name, _name) ) {
		return settings;
	}
	
	// Use Lodash's assign to gracefully handle if attributes are undefined
	Object.assign(settings.attributes, {
		stretchLink         :{ type: 'boolean', default: false, },
		stretchLinkURL      :{ type: 'string', default: '', },
		stretchLinkTitle    :{ type: 'string', default: '', },
		stretchLinkNewTab   :{ type: 'boolean', default: false, },
		stretchLinkID       :{ type: 'string', default: '', },
	} );
	
	return settings;
};

addFilter( 'blocks.registerBlockType', 'sv100-premium/gutenberg-extended-block-controls', addCustomControlAttributes );

// the component
function StretchLink(props){
	
	if ( ! isSupported(props.name, _name) ) {
		return (
			<Fragment></Fragment>
		);
	}
	
	const values = props.attributes;
	let linkControlValues = {
		url: values.stretchLinkURL,
		title: values.stretchLinkTitle,
		opensInNewTab: values.stretchLinkNewTab,
	};
	
	if(values[_prefix] === true){
		return(
			<Fragment>
				<ToggleControl  label={__('StretchLink', 'sv100_premium')} value={values[_prefix]}
				                checked={values[_prefix]}
				                onChange={ (val) => props.setAttributes({ stretchLink: val }) }
				/>
				<PanelRow>
					<LinkControl value={linkControlValues}
					             onChange={(val) =>
						             props.setAttributes({
							             stretchLinkURL: val.url,
							             stretchLinkTitle: val.title,
							             stretchLinkNewTab: val.opensInNewTab,
					                })
					             }
					             onRemove={(val) =>
						             props.setAttributes({
							             stretchLinkURL: '',
							             stretchLinkTitle: '',
							             stretchLinkNewTab: val.opensInNewTab,
						             })
					             }
					/>
				</PanelRow>
				<PanelRow>
					<InputControl label={__('Link HTML-Anchor', 'sv100_premium')}
					              onChange={(val) =>
						              props.setAttributes({
							              stretchLinkID: val,
						              })
					              }
					/>
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