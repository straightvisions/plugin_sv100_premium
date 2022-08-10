import FlexCoreColumns from './flex_core_columns/index.jsx';
import Margin from './margin/index.jsx';
import Padding from './padding/index.jsx';
import Hide from './hide/index.jsx';
import Position from './position/index.jsx';
import Border from './border/index.jsx';
import BorderRadius from './border_radius/index.jsx';
import TextAlign from './text_align/index.jsx';
import FontSize from './font_size/index.jsx';
import LineHeight from './line_height/index.jsx';
import Hyphens from './hyphens/index.jsx';
import Height from './height/index.jsx';
import Width from './width/index.jsx';
import StretchLink from './stretch_link/index.jsx';
import PosterImage from './poster_image/index.jsx';
import BoxShadow from './box_shadow/index.jsx';
import Grid from './grid/index.jsx';
const { Fragment } = wp.element;

function ExtendedControlComponents( props ){
	let input =
		<Fragment>
			<FlexCoreColumns { ...props }/>
			<Grid { ...props }/>
			<TextAlign { ...props }/>
			<FontSize { ...props }/>
			<LineHeight { ...props }/>
			<Hyphens { ...props }/>
			<Margin {...props}/>
			<Padding {...props}/>
			<Border { ...props }/>
			<BorderRadius { ...props }/>
			<BoxShadow { ...props }/>
			<Height { ...props }/>
			<Width { ...props }/>
			<StretchLink { ...props }/>
			<PosterImage { ...props }/>
			<Position { ...props }/>
			<Hide { ...props }/>
		</Fragment>
	;
	
	if(props.attributes._regenerateCSS){
		input = <Disabled>{input}</Disabled>;
	}
	
	return(<Fragment>{input}</Fragment>);
}

export default ExtendedControlComponents;