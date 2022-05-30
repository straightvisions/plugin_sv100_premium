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
				->set_title( __( 'Enable Custom Lightbox', 'sv100_premium' ) )
				->set_description( __( 'Show Lightbox when linking to an anchor for Group with Hidden Style', 'sv100_premium' ) )
				->load_type( 'checkbox' );

			$this->get_setting( 'lightbox' )
				->set_title( __( 'Add a new lightbox', 'sv100_premium' ) )
				->load_type( 'group' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'entry_label' )
				->set_title( __( 'Label', 'sv100_premium' ) )
				->set_description( __( 'A label to differentiate your uploaded fonts.', 'sv100_premium' ) )
				->load_type( 'text' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'entry_id' )
				->set_title( __( 'ID', 'sv100_premium' ) )
				->set_description( __( 'Unique ID for Anchor/Link, allowed chars: A-Z, a-z, 0-9, _, -', 'sv100_premium' ) )
				->load_type( 'id' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'enable_background_layer' )
				->set_title( __( 'Enable Background Layer', 'sv100_premium' ) )
				->set_is_responsive(true)
				->load_type( 'checkbox' );
			
			$this->get_setting( 'lightbox' )
			     ->run_type()
			     ->add_child()
			     ->set_ID( 'prevent_background_scrolling' )
			     ->set_title( __( 'Prevent Background Scrolling', 'sv100_premium' ) )
			     ->set_description( __( 'Prevent background scrolling while popup is visible. Useful for fullscreen popups.', 'sv100_premium' ) )
			     ->set_is_responsive(true)
			     ->load_type( 'checkbox' );
			
			$this->get_setting( 'lightbox' )
			     ->run_type()
			     ->add_child()
			     ->set_ID( 'enable_video_fullscreen' )
			     ->set_title( __( 'Enable Fullscreen for Videos', 'sv100_premium' ) )
			     ->set_description( __( 'When a lightbox with video content gets triggered, switch video to fullscreen mode.', 'sv100_premium' ) )
			     ->load_type( 'checkbox' );
			
			$this->get_setting( 'lightbox' )
			     ->run_type()
			     ->add_child()
			     ->set_ID( 'enable_video_autoplay' )
			     ->set_title( __( 'Enable Video Autoplay', 'sv100_premium' ) )
			     ->set_description( __( 'When a lightbox with video content gets triggered, autoplay the video.', 'sv100_premium' ) )
			     ->load_type( 'checkbox' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'background_layer_color' )
				->set_title( __( 'Background Layer Color', 'sv100_premium' ) )
				->set_default_value( '0,0,0,0.5' )
				->set_is_responsive(true)
				->load_type( 'color' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'width' )
				->set_title( __( 'Lightbox Width', 'sv100_premium' ) )
				->set_is_responsive(true)
				->set_default_value('75vw')
				->load_type( 'text' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'height' )
				->set_title( __( 'Lightbox Height', 'sv100_premium' ) )
				->set_is_responsive(true)
				->set_default_value('75vh')
				->load_type( 'text' );

			$this->get_setting( 'lightbox' )
				->run_type()
				->add_child()
				->set_ID( 'margin' )
				->set_title( __( 'Margin', 'sv100_premium' ) )
				->set_is_responsive(true)
				->set_default_value(array(
					'top'		=> 'auto',
					'right'		=> 'auto',
					'bottom'	=> 'auto',
					'left'		=> 'auto'
				))
				->load_type( 'margin' );

			$this->get_setting('lightbox')
				->run_type()
				->add_child()
				->set_ID('element_in_view')
				->set_title(__('Show when specific Element is in View', 'sv100'))
				->set_description(__('Set an unique ID of an element. If it is in viewport, Lightbox will be shown.', 'sv_tracking_manager'))
				->load_type('id');

			$this->get_setting('lightbox')
				->run_type()
				->add_child()
				->set_ID('show_when_percent_scrolled')
				->set_title(__('Show when given % of website body height has been scrolled', 'sv100'))
				->set_description(__('Set an integer for the % value. If empty, trigger will not be active.', 'sv_tracking_manager'))
				->load_type('number');

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
			$this->get_script( 'config' )
				->set_path( 'lib/css/config/init.php' )
				->set_inline( true );

			$this->get_script( 'custom_lightbox' )
				->set_path( 'lib/css/common/custom_lightbox.css' );

			$this->get_script( 'style_lightbox_close_button' )
				->set_is_gutenberg()
				->set_path( 'lib/css/common/style_lightbox_close_button.css' );

			$selectors	= array();
			$props		= array();
			
			foreach($this->get_setting( 'lightbox' )->get_data() as $lightbox){
				$selectors[$lightbox['entry_id']]										= "a[href='#".$lightbox['entry_id']."']";

				if(isset($lightbox['element_in_view']) && strlen($lightbox['element_in_view']) > 0){
					$props['element_in_view']['#'.$lightbox['entry_id']]				= '#'.$lightbox['element_in_view'];
				}
				
				if(isset($lightbox['enable_video_fullscreen'])){
					$props['enable_video_fullscreen']['#'.$lightbox['entry_id']]		= (int)$lightbox['enable_video_fullscreen'];
				}
				
				if(isset($lightbox['enable_video_autoplay'])){
					$props['enable_video_autoplay']['#'.$lightbox['entry_id']]			= (int)$lightbox['enable_video_autoplay'];
				}

				if(isset($lightbox['show_when_percent_scrolled'])){
					$props['show_when_percent_scrolled']['#'.$lightbox['entry_id']]	= (int)$lightbox['show_when_percent_scrolled'];
				}
			}
			
			$props['selector']	= implode(',',$selectors);
			// Common JS
			$this->get_script( 'custom_lightbox_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/custom_lightbox.js' )
				->set_localized($props);

			// is in view JS
			$this->get_script( 'is_in_view_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/is_in_view.js' )
				->set_deps(array(
					$this->get_script( 'custom_lightbox_js' )->get_handle(),
					$this->get_module('common')->get_script( 'is_in_viewport_js' )->get_handle()
				));


			// video JS
			$this->get_script( 'video_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/video.js' )
				->set_deps(array($this->get_script( 'custom_lightbox_js' )->get_handle()));

			// Show when percentage scrolled JS
			$this->get_script( 'show_when_percent_scrolled_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/show_when_percent_scrolled.js' )
				->set_deps(array($this->get_script( 'custom_lightbox_js' )->get_handle()));

			// Prevent lazyload through wp rocket
			add_filter( 'rocket_delay_js_exclusions', function ( $excluded_files = array() ) {
				$excluded_files[] = '/lib/js/frontend/custom_lightbox.js';
				$excluded_files[] = '/lib/js/frontend/is_in_view.js';
				$excluded_files[] = '/lib/js/frontend/video.js';
				$excluded_files[] = '/lib/js/frontend/show_when_percent_scrolled.js';

				return $excluded_files;
			} );

			return $this;
		}

		public function enqueue_scripts(): custom_lightbox {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			$this->get_module('common')->get_script( 'is_in_viewport_js' )->set_is_enqueued();
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