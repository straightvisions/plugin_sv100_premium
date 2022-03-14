<?php
	// sticky style
	$lightboxes		= $module->get_setting( 'lightbox' )->get_data();

	if(is_array($lightboxes) && count($lightboxes) > 0) {
		foreach ($module->get_setting('lightbox')->get_data() as $lightbox) {
			$temp_width = clone $module->get_setting($lightbox['entry_id'] . '_width');
			$temp_height = clone $module->get_setting($lightbox['entry_id'] . '_height');
			$temp_margin = clone $module->get_setting($lightbox['entry_id'] . '_margin');

			echo $_s->build_css(
				is_admin() ? '' :
					(
						'.wp-block-group.is-style-sv-hidden.active#' . $lightbox['entry_id'] . ' > .wp-block-group,' .
						'.wp-block-group.is-style-sv-hidden.active#' . $lightbox['entry_id'] . ' > .wp-block-group__inner-container' // Fallback
					),
				array_merge(
					$temp_width
						->set_is_responsive(true)
						->load_type('text')
						->set_data($lightbox['width'])
						->get_css_data('width'),
					$temp_height
						->set_is_responsive(true)
						->load_type('text')
						->set_data($lightbox['height'])
						->get_css_data('height'),
					$temp_margin
						->set_is_responsive(true)
						->load_type('margin')
						->set_data($lightbox['margin'])
						->get_css_data()
				)
			);

			$properties = array();
			$properties['display'] = $_s->prepare_css_property_responsive(array_map(function ($enable_background_layer) {
				return $enable_background_layer ? 'block' : 'none';
			}, $lightbox['enable_background_layer']));

			$temp_background_layer_color = clone $module->get_setting($lightbox['entry_id'] . '_background_layer_color');

			echo $_s->build_css(
				is_admin() ? '' : '.wp-block-group.is-style-sv-hidden.active#' . $lightbox['entry_id'] . ':after',
				array_merge(
					$properties,
					$temp_background_layer_color
						->set_is_responsive(true)
						->load_type('color')
						->set_data($lightbox['background_layer_color'])
						->get_css_data('background-color')
				)
			);
		}
	}