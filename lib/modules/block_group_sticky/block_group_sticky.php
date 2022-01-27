<?php
	namespace sv100_premium;

	class block_group_sticky extends modules {
		public function init(): block_group_sticky {
			$this->set_section_title( __( 'Block Group Style: Sticky', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->block_styles()->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}

			return $this;
		}

		protected function load_settings(): block_group_sticky {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Style: Sticky Group Block', 'sv100' ) )
				->set_description( __( 'Groups can be made sticky. Enable this to enable in style-selection of group block.', 'sv100' ) )
				->load_type( 'checkbox' );

			$this->get_setting( 'sticky_offset' )
				->set_title( __( 'Style Sticky: Offset', 'sv100' ) )
				->set_description( __( 'Top Offset in Pixel for Sticky style.', 'sv100' ) )
				->set_is_responsive(true)
				->set_default_value(0)
				->load_type( 'number' );

			return $this;
		}

		public function is_active(): bool{
			// activate not set
			if(!$this->get_setting('activate')->get_data()){
				return false;
			}
			// activate not true
			if($this->get_setting('activate')->get_data() !== '1'){
				return false;
			}

			return true;
		}

		protected function register_scripts(): block_group_sticky {
			$this->get_script( 'inline_config' )
				->set_path( 'lib/css/config/init.php' )
				->set_inline( true );

			$this->get_script( 'style_sticky' )
				->set_is_gutenberg()
				->set_path( 'lib/css/common/style_sticky.css' );

			return $this;
		}

		public function enqueue_scripts(): block_group_sticky {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}

		protected function block_styles(): block_group_sticky {
			$this->get_script('block')
				->set_path('lib/js/backend/block_extra_styles.js')
				->set_type('js')
				->set_is_gutenberg()
				->set_is_backend()
				->set_deps(array('wp-blocks', 'wp-dom'))
				->set_is_enqueued();

			return $this;
		}
	}