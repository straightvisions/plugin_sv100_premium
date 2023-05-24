<?php

	$stretched = isset($attrs['stretchLink']) && $attrs['stretchLink'] === true ? true : false;

	if($stretched === true && empty($attrs['stretchLinkURL']) === false){
		$target = isset($attrs['stretchLinkNewTab']) && $attrs['stretchLinkNewTab'] === true ? '_blank' : '_self';
		$click_id = empty($attrs['stretchLinkID']) === false ? 'id="'.$attrs['stretchLinkID'].'" ' : '';
		
		$element = '<a '.$click_id.'class="stretch-link" href="'.$attrs['stretchLinkURL'].'" target="'.$target.'"></a>';
		// parse HTML
		$html = $this->HTML_append($html, $element, $block);

		// enqueue additional css
		$this->get_script( 'stretch_link' )->set_is_enqueued();
	}