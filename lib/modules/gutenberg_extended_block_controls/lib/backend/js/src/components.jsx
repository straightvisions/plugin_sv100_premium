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
			<Margin {...props}/>
			<Padding {...props}/>
			<GapFlex { ...props }/>
			<StackFlex { ...props }/>
			<Hide { ...props }/>
			<BorderRadius { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;