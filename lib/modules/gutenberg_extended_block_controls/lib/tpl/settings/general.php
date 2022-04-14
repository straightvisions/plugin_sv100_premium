<?php if ( current_user_can( 'activate_plugins' ) ) { ?>
	<div class="sv_setting_subpage">
		<h2><?php _e('General', 'sv100'); ?></h2>
		<h3 class="divider"><?php _e( 'Subareas', 'sv100' ); ?></h3>
		<div class="sv_setting_flex">
			<?php
				//echo $module->get_setting( 'margin' )->form();
			?>
		</div>
		
	</div>
<?php } ?>