import GapFlex from './gap_flex/index.jsx';
import StackFlex from './stack_flex/index.jsx';
import Margin from './margin/index.jsx';
const { Fragment } = wp.element;

function ExtendedControlComponents( props ){
	return(
		<Fragment>
			<Margin {...props}/>
			<GapFlex { ...props }/>
			<StackFlex { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;