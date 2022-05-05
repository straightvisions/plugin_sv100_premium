<?php

	$stretched = isset($attrs['stretchLink']) && $attrs['stretchLink'] === true ? true : false;
	
	if($stretched === true){
		$element = '<a class="stretch-link" href="test"></a>';
		$html = $this->HTML_append($html, $element);
	}