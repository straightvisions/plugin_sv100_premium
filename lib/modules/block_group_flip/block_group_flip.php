<?php
	namespace sv100_premium;

	class block_group_flip extends modules {
		public function init(): block_group_flip {
			$this->set_section_title( __( 'Block Group Style: Flip', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->block_styles()->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}

			return $this;
		}

		protected function load_settings(): block_group_flip {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Style: Flip Group Block', 'sv100' ) )
				->set_description( __( 'Group Block with two Child-Group-Blocks flips to second child when click/hover on first child.', 'sv100' ) )
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

		protected function register_scripts(): block_group_flip {
			$this->get_script( 'style_flip' )
				->set_path( 'lib/css/common/style_flip.css' );

			return $this;
		}

		public function enqueue_scripts(): block_group_flip {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}

		protected function block_styles(): block_group_flip {
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