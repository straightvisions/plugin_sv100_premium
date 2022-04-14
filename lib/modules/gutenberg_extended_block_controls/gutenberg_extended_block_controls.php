<?php
	namespace sv100_premium;

	class gutenberg_extended_block_controls extends modules {
		public function init(): gutenberg_extended_block_controls {
			$this->set_section_title( __( 'Gutenberg Extended Block Controls', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}

			return $this;
		}

		protected function load_settings(): gutenberg_extended_block_controls {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Feature', 'sv100' ) )
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

		protected function register_scripts(): gutenberg_extended_block_controls {
			if($this->is_active() === true){
				$this->get_script('controls')
				     ->set_path('lib/backend/js/dist/index.js')
				     ->set_type('js')
				     ->set_is_gutenberg()
				     ->set_is_backend()
				     ->set_deps(array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'))
				     ->set_is_enqueued();
			}
			
			return $this;
		}

		public function enqueue_scripts(): gutenberg_extended_block_controls {
			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}

		protected function block_styles(): gutenberg_extended_block_controls {
	
			return $this;
		}
	}