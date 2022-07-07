import EditorStyles from "../../editor-styles";
import {updateCSS, isSupported} from "../../../helpers";

const { Fragment } = wp.element;
const {
	PanelRow,
	ToggleControl,
	__experimentalUnitControl,
	SelectControl,
	Flex,
	FlexBlock,
	FlexItem,
	ColorIndicator,
	ColorPicker,
	ColorPalette,
	Popover
} = wp.components;

const UnitControl = __experimentalUnitControl;
const { __ } = wp.i18n;

function BoxShadowFragment(props){
	const _name = 'BoxShadow';
	const _prefix = 'boxShadow';

	const values = props.attributes;
	const currentResponsiveTab = typeof props.attributes.currentResponsiveTab !== 'undefined' ? props.attributes.currentResponsiveTab : 'Mobile';
	
	const settings = wp.data.select( 'core/block-editor' ).getSettings();
	let themeColors = [];
	
	if ( settings && settings.colors ) {
		themeColors = settings.colors;
	}

	const num = props.num;
	
	return (
		<Fragment>
			<p>{'Shadow '+num+': X | Y | Blur | Spread'}</p>
			<PanelRow>
				<Flex gap={'2px'}>
					<FlexItem>
						<UnitControl value={ values[_prefix+'OffsetX'+num+currentResponsiveTab] }
						             onChange={(val) => updateCSS(val, props, _name, _prefix + 'OffsetX' + num, EditorStyles) }
						             onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'OffsetX' + num, EditorStyles) }
						             allowReset={false}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl value={ values[_prefix+'OffsetY'+num+currentResponsiveTab] }
						             onChange={(val) => updateCSS(val, props, _name, _prefix + 'OffsetY' + num, EditorStyles) }
						             onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'OffsetY' + num, EditorStyles) }
						             allowReset={false}
						/>
					</FlexItem>
					
					<FlexItem>
						<UnitControl value={ values[_prefix+'Blur'+num+currentResponsiveTab] }
						             onChange={(val) => updateCSS(val, props, _name, _prefix + 'Blur' + num, EditorStyles) }
						             onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'Blur' + num, EditorStyles) }
						             allowReset={false}
						/>
					</FlexItem>
					
					<FlexItem>
						<UnitControl value={ values[_prefix+'Spread'+num+currentResponsiveTab] }
						             onChange={(val) => updateCSS(val, props, _name, _prefix + 'Spread' + num, EditorStyles) }
						             onUnitChange={(val) => updateCSS(val, props, _name, _prefix + 'Spread' + num, EditorStyles) }
						             allowReset={false}
						/>
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex justify={'flex-start'}>
					<FlexItem>
						<SelectControl
							value={ values[_prefix+'Type'+num+currentResponsiveTab] }
							onChange={(val) => updateCSS(val, props, _name, _prefix + 'Type'+num, EditorStyles)}
							options={[
								{ label: __('Outside', 'sv100_premium'), value: 'outside' },
								{ label: __('Inside', 'sv100_premium'), value: 'inside' },
							]}
						/>
					</FlexItem>
					<FlexItem>
						<ColorIndicator
							className={'clickable'}
							colorValue={values[_prefix+'Color'+num+currentResponsiveTab]}
							onClick={()=>props.setAttributes({['_borderColor'+num+'Popover']: true})}
						/>
						{values['_borderColor' + num + 'Popover'] === true &&
						<Popover position='left'
						         onClose={() => props.setAttributes({['_borderColor' + num + 'Popover']: false})}>
							<ColorPalette
								colors={themeColors}
								value={values[_prefix + 'Color' + num + currentResponsiveTab]}
								onChange={(val) => updateCSS(val, props, _name, _prefix + 'Color' + num, EditorStyles)}
							/>
						</Popover>
						}
					</FlexItem>
				</Flex>
			</PanelRow>
		</Fragment>
	);
}

export default BoxShadowFragment;