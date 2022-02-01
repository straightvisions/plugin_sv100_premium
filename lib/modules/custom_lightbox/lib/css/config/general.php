<?php
	// sticky style
	echo $_s->build_css(
		is_admin() ? '' : '.wp-block-group.is-style-sv-hidden.active .wp-block-group__inner-container',
		array_merge(
			$module->get_setting('width')->get_css_data('width'),
			$module->get_setting('height')->get_css_data('height')
		)
	);