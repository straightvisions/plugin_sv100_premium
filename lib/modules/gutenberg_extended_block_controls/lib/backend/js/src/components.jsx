import GapFlex from './gap_flex/index.jsx';
import StackFlex from './stack_flex/index.jsx';
import Margin from './margin/index.jsx';
import Padding from './padding/index.jsx';
import Hide from './hide/index.jsx';
import BorderRadius from './border_radius/index.jsx';
const { Fragment } = wp.element;

function ExtendedControlComponents( props ){
	return(
		<Fragment>
			<GapFlex { ...props }/>
			<StackFlex { ...props }/>
			<Margin {...props}/>
			<Padding {...props}/>
			<BorderRadius { ...props }/>
			<Hide { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;