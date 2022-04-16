export function getUniqueBlockId(props){
	let id = btoa( props.clientId ).replace(/[^a-z0-9]/gi,'');
	
	return id.substr( id.length - 12, 12);
}

export function isDuplicate(props){
	let output = false;

	const elements = document.querySelectorAll('.block-'+props.attributes.blockId);
	
	if(elements.length > 1){
		output = true;
	}
	
	return output;
}
