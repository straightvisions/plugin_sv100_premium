<?php
	namespace sv100_premium;

	class scroll_progress_bar extends modules {
		public function init(): scroll_progress_bar {
			$this->set_section_title( __( 'Scroll Progress Bar', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->set_section_template_path( $this->get_path( 'lib/tpl/settings/init.php' ) )
				->load_settings()
				->register_scripts()
				->get_root()->add_section( $this );

			add_action('wp', function(){
				if($this->is_active()){
					$this->enqueue_scripts()->add_metaboxes();

					add_action('wp_footer', function(){
						echo '<div class="'.$this->get_prefix().'"><div class="'.$this->get_prefix('indicator').'"></div></div>';
					});
				}
			});

			add_action('admin_init', array($this, 'add_metaboxes'));

			return $this;
		}
		public function add_metaboxes(): scroll_progress_bar{
			$states = array(
				'' => __('Default', 'sv100'),
				'0' => __('Disabled', 'sv100'),
				'1' => __('Enabled', 'sv100')
			);

			$this->get_instance('sv100')->get_module('sv_metabox')->get_setting( $this->get_prefix('activate') )
				->set_title( __('Progress Bar', 'sv100') )
				->set_description( __('Overwrite Global Setting for this post.', 'sv100') )
				->set_default_value('0')
				->load_type( 'select' )
				->set_options($states);

			return $this;
		}
		protected function load_settings(): scroll_progress_bar {
			$this->get_setting( 'height' )
				->set_title( __( 'Height in Pixel', 'sv100_premium' ) )
				->set_default_value( '8' )
				->set_is_responsive(true)
				->load_type( 'number' );

			$this->get_setting( 'width' )
				->set_title( __( 'Width including unit', 'sv100_premium' ) )
				->set_description( __( 'e.g. 200px or 100%', 'sv100_premium' ) )
				->set_default_value( '100%' )
				->set_is_responsive(true)
				->load_type( 'text' );

			$this->get_setting( 'bg_color' )
				->set_title( __( 'Background color', 'sv100_premium' ) )
				->set_default_value( '204,204,204,1' )
				->set_is_responsive(true)
				->load_type( 'color' );

			$this->get_setting( 'bg_color_indicator' )
				->set_title( __( 'Indicator Background color', 'sv100_premium' ) )
				->set_default_value( '0,0,0,1' )
				->set_is_responsive(true)
				->load_type( 'color' );

			foreach(get_post_types(array('public' => true)) as $post_type) {
				$this->get_setting('activate_'.$post_type)
					->set_title(__('Activate for '.$post_type, 'sv100'))
					->load_type('checkbox');
			}

			return $this;
		}
		protected function register_scripts(): scroll_progress_bar {
			$this->get_script( 'config' )
				->set_path( 'lib/css/config/init.php' )
				->set_inline( true );

			$this->get_script( 'common' )
				->set_path( 'lib/css/common/common.css' )
				->set_inline( true );

			$this->get_script( 'common_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/init.js' );

			return $this;
		}
		public function enqueue_scripts(): scroll_progress_bar {
			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}
		public function is_active($post_type = false): bool{
			global $post;

			if (!$post) {
				return false;
			}

			if(!$post_type){
				$post_type	= get_post_type();
			}

			$setting = $this->get_instance('sv100')->get_module('sv_metabox')->get_data($post->ID, $this->get_prefix('activate'), $this->get_setting('activate_'.$post_type)->get_data());

			return boolval($setting);
		}
	}