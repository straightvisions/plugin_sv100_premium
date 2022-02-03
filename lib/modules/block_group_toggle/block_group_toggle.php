<?php
	namespace sv100_premium;

	class block_group_toggle extends modules {
		public function init(): block_group_toggle {
			$this->set_section_title( __( 'Block Group Style: Toggle', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->block_styles()->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}

			return $this;
		}

		protected function load_settings(): block_group_toggle {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Style: Toggle Group Block', 'sv100' ) )
				->set_description( __( 'Toggle Group by linking to group ID with prefix #sv_toggle_', 'sv100' ) )
				->load_type( 'checkbox' );

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

		protected function register_scripts(): block_group_toggle {
			$this->get_script( 'style_toggle' )
				->set_path( 'lib/css/common/style_toggle.css' );

			$this->get_script( 'style_toggle_editor' )
				->set_is_gutenberg()
				->set_is_backend()
				->set_path( 'lib/css/common/style_toggle_editor.css' );

			$this->get_script( 'style_toggle_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/style_toggle.js' );

			add_filter( 'rocket_delay_js_exclusions', function ( $excluded_files = array() ) {
				$excluded_files[] = '/lib/js/frontend/style_toggle.js';

				return $excluded_files;
			} );

			return $this;
		}

		public function enqueue_scripts(): block_group_toggle {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}

		protected function block_styles(): block_group_toggle {
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