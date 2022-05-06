<?php
	$posterImage = isset($attrs['posterImage']) && $attrs['posterImage'] === true ? true : false;
	
	if($posterImage === true && empty($attrs['posterImageURL']) === false){
		$poster = '<video poster ="'.$attrs['posterImageURL'].'"';
		// parse HTML
		$html = str_replace('<video', $poster, $html);
	}