<?php
	// sticky style
	echo $_s->build_css(
		is_admin() ? '.editor-styles-wrapper .wp-block-group.is-style-sv-sticky' : '.wp-block-group.is-style-sv-sticky',
		array_merge(
			$module->get_setting('sticky_offset')->get_css_data('top', '', 'px')
		)
	);