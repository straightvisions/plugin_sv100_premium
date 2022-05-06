import GapFlex from './gap_flex/index.jsx';
import StackFlex from './stack_flex/index.jsx';
import Margin from './margin/index.jsx';
import Padding from './padding/index.jsx';
import Hide from './hide/index.jsx';
import BorderRadius from './border_radius/index.jsx';
import TextAlign from './text_align/index.jsx';
import FontSize from './font_size/index.jsx';
import LineHeight from './line_height/index.jsx';
import Height from './height/index.jsx';
import Width from './width/index.jsx';
import StretchLink from './stretch_link/index.jsx';
const { Fragment } = wp.element;

function ExtendedControlComponents( props ){
	return(
		<Fragment>
			<GapFlex { ...props }/>
			<StackFlex { ...props }/>
			<TextAlign { ...props }/>
			<FontSize { ...props }/>
			<LineHeight { ...props }/>
			<Margin {...props}/>
			<Padding {...props}/>
			<BorderRadius { ...props }/>
			<Height { ...props }/>
			<Width { ...props }/>
			<StretchLink { ...props }/>
			<Hide { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;