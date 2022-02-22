<?php
	namespace sv100_premium;

	class custom_lightbox extends modules {
		public function init(): custom_lightbox {
			$this->set_section_title( __( 'Custom Lightbox', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->block_styles()->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}

			return $this;
		}

		protected function load_settings(): custom_lightbox {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Custom Lightbox', 'sv100' ) )
				->set_description( __( 'Show Lightbox when linking to an anchor for Group with Hidden Style', 'sv100' ) )
				->load_type( 'checkbox' );

			$this->get_setting( 'lightbox' )
				->set_title( __( 'Add a new lightbox', 'sv100' ) )
				->load_type( 'group' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'entry_label' )
				->set_title( __( 'Label', 'sv100' ) )
				->set_description( __( 'A label to differentiate your uploaded fonts.', 'sv100' ) )
				->load_type( 'text' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'entry_id' )
				->set_title( __( 'ID', 'sv100' ) )
				->set_description( __( 'Unique ID for Anchor/Link, allowed chars: A-Z, a-z, 0-9, _, -', 'sv100' ) )
				->load_type( 'id' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'width' )
				->set_title( __( 'Lightbox Width', 'sv100' ) )
				->set_is_responsive(true)
				->set_default_value('75vw')
				->load_type( 'text' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'height' )
				->set_title( __( 'Lightbox Height', 'sv100' ) )
				->set_is_responsive(true)
				->set_default_value('75vh')
				->load_type( 'text' );

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

		protected function register_scripts(): custom_lightbox {
			$this->get_script( 'inline_config' )
				->set_path( 'lib/css/config/init.php' )
				->set_inline( true );

			$this->get_script( 'custom_lightbox' )
				->set_path( 'lib/css/common/custom_lightbox.css' );

			$this->get_script( 'style_lightbox_close_button' )
				->set_is_gutenberg()
				->set_path( 'lib/css/common/style_lightbox_close_button.css' );

			$selectors	= array();
			foreach($this->get_setting( 'lightbox' )->get_data() as $lightbox){
				$selectors[]		= "a[href='#".$lightbox['entry_id']."']";
			}
			$selector	= implode(',',$selectors);

			$this->get_script( 'custom_lightbox_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/custom_lightbox.js' )
				->set_localized(array('selector' => $selector));

			add_filter( 'rocket_delay_js_exclusions', function ( $excluded_files = array() ) {
				$excluded_files[] = '/lib/js/frontend/custom_lightbox.js';

				return $excluded_files;
			} );

			return $this;
		}

		public function enqueue_scripts(): custom_lightbox {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}

		protected function block_styles(): custom_lightbox {
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