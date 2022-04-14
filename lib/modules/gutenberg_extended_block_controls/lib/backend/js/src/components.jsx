import Spacing from './spacing/index.jsx';
import assign from "lodash.assign";
const { Component, Fragment } = wp.element;

function ExtendedControlComponents( props ){
	const {
		attributes:{
			blockId
		},
		setAttributes
	} = props;
	
	return(
		<Fragment>
			<Spacing  { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;