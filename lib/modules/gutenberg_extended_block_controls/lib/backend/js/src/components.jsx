import GapFlex from './gap_flex/index.jsx';
import StackFlex from './stack_flex/index.jsx';
const { Fragment } = wp.element;

function ExtendedControlComponents( props ){
	return(
		<Fragment>
			<GapFlex { ...props }/>
			<StackFlex { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;