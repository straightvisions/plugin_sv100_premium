<?php
	namespace sv100_premium;

	class metaboxes extends modules {
		public function init() {
			if ( is_admin() ) {
				add_action( 'current_screen', array( $this, 'load' ) );
			} else {
				add_action( 'wp', array( $this, 'load' ) );
			}
		}
		public function load(): metaboxes{
			static::$metabox
				->create( $this )
				->set_title( __('SV100 Premium', 'sv100_premium') );

			return $this;
		}
		public function get_data(int $post_id, string $field_id, $default_value = false){
			return static::$metabox->get_data($post_id, $this->get_setting($field_id)->get_field_id(), $default_value);
		}
	}