export function getUniqueBlockId(props){
	let id = props.clientId;
	const salt = new Date().getTime();
	
	return btoa( 'sv100_premium_gutenberg_extended_block_controls_' + id + salt ).replace(/[^a-z0-9]/gi,'');
}

export function isDuplicate(props){
	let output = false;

	const elements = document.querySelectorAll('.block-'+props.attributes.blockId);
	
	if(elements.length > 1){
		output = true;
	}
	
	return output;
}
