<?php
	if(is_admin() ? $module->section_dynamic_visibility_status() : $module->section_dynamic_visibility_status_post()){
		// Section Visibility
		$properties						= array();
		$section_dynamic_visibility		= array_map(function ($val) { return $val ? '0' : '100%'; }, $module->get_setting('section_dynamic_visibility')->get_data());
		$properties['max-height']		= $module->get_setting('section_dynamic_visibility')->prepare_css_property_responsive($section_dynamic_visibility);
		$section_dynamic_visibility		= array_map(function ($val) { return $val ? '0' : '1'; }, $module->get_setting('section_dynamic_visibility')->get_data());
		$properties['transform']		= $module->get_setting('section_dynamic_visibility')->prepare_css_property_responsive($section_dynamic_visibility, 'scaleY(', ')');
		$section_dynamic_visibility		= array_map(function ($val) { return $val ? '0' : '100%'; }, $module->get_setting('section_dynamic_visibility')->get_data());
		$properties['height']			= $module->get_setting('section_dynamic_visibility')->prepare_css_property_responsive($section_dynamic_visibility);
		$section_dynamic_visibility		= array_map(function ($val) { return $val ? 'hidden' : 'visible'; }, $module->get_setting('section_dynamic_visibility')->get_data());
		$properties['overflow']			= $module->get_setting('section_dynamic_visibility')->prepare_css_property_responsive($section_dynamic_visibility);
		$section_dynamic_visibility		= array_map(function ($val) { return $val ? '0' : '1'; }, $module->get_setting('section_dynamic_visibility')->get_data());
		$properties['opacity']			= $module->get_setting('section_dynamic_visibility')->prepare_css_property_responsive($section_dynamic_visibility);

		echo $_s->build_css(
			is_admin() ?
				''
				// no admin styles wanted here
				//'.editor-styles-wrapper section.wp-block-group:not(:first-of-type):not(.section_active), '. // Default Section Visibility State per Responsive Setting
				//'.editor-styles-wrapper section.wp-block-group.section_not_active' // Default Section Not Visibility State when not active Class is added
				:
				'section.wp-block-group:not(.section_active), '. // Default Section Visibility State per Responsive Setting
				'section.wp-block-group.section_not_active', // Default Section Not Visibility State when not active Class is added
			array_merge(
				$properties
			)
		);
	}
