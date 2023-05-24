<?php if ( current_user_can( 'activate_plugins' ) ) { ?>
	<div class="sv_setting_subpage">
		<h2><?php _e('General', 'sv100_premium'); ?></h2>
		<h3 class="divider"><?php _e( 'Size', 'sv100_premium' ); ?></h3>
		<div class="sv_setting_flex">
			<?php
				echo $module->get_setting( 'activate' )->form();
				echo $module->get_setting( 'height' )->form();
				echo $module->get_setting( 'width' )->form();
			?>
		</div>
		<h3 class="divider"><?php _e( 'Colors', 'sv100_premium' ); ?></h3>
		<div class="sv_setting_flex">
			<?php
				echo $module->get_setting( 'bg_color' )->form();
				echo $module->get_setting( 'bg_color_indicator' )->form();
			?>
		</div>
		<h3 class="divider"><?php _e( 'Post Types', 'sv100_premium' ); ?></h3>
		<div class="sv_setting_flex">
		<?php
			foreach(get_post_types(array('public' => true)) as $post_type) {
				echo $module->get_setting( 'activate_'.$post_type )->form();
			}
		?>
		</div>
	</div>
<?php } ?>