import Spacing from './spacing/index.jsx';
const { Component, Fragment } = wp.element;


function ExtendedControlComponents( props ){
	return(
		<Fragment>
			<Spacing  { ...props }/>
		</Fragment>
		
	);
}

export default ExtendedControlComponents;