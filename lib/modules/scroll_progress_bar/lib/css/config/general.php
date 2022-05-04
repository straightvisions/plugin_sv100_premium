<?php
	echo $_s->build_css(
		'.sv100_premium_scroll_progress_bar, .sv100_premium_scroll_progress_bar_indicator',
		array_merge(
			$module->get_setting('height')->get_css_data('height', '', 'px')
		)
	);

	echo $_s->build_css(
		'.sv100_premium_scroll_progress_bar',
		array_merge(
			$module->get_setting('width')->get_css_data('width'),
			$module->get_setting('bg_color')->get_css_data('background-color')
		)
	);

	echo $_s->build_css(
		'.sv100_premium_scroll_progress_bar_indicator',
		array_merge(
			$module->get_setting('bg_color_indicator')->get_css_data('background-color')
		)
	);