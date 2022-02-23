<?php
	namespace sv100_premium;
	
	class block_group_section_visibility extends modules {
		public function init() {
			$this->set_section_title( __( 'Block Group Section Visibility', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			add_action('wp', array($this, 'go'));
			add_action('admin_init', array($this, 'go'));
		}

		public function go(){
			$this->add_metaboxes()->register_scripts()->enqueue_scripts();
		}

		protected function load_settings(): block_group_section_visibility {
			$this->get_setting( 'section_dynamic_visibility' )
				->set_title( __( 'Sections: Dynamic Visibility', 'sv100' ) )
				->set_description( __( 'Enable this if groups with section-tag should be hidden (except first one). Use navigation elements with anchor to section-IDs to switch through sections.', 'sv100' ) )
				->set_is_responsive(true)
				->load_type( 'checkbox' );

			return $this;
		}

		protected function register_scripts(): block_group_section_visibility {
			if(is_admin() ? $this->section_dynamic_visibility_status() : $this->section_dynamic_visibility_status_post()){
				$this->get_script( 'inline_config' )
					->set_path( 'lib/css/config/init.php' )
					->set_inline( true );

				$this->get_script( 'section_visibility' )
					->set_inline(true)
					->set_path( 'lib/css/common/section_visibility.css' );

				$this->get_script( 'section_visibility_editor' )
					->set_is_backend()
					->set_is_gutenberg()
					->set_path( 'lib/css/common/section_visibility_editor.css' );

				$this->get_module('common')->get_script( 'is_in_viewport_js' )->set_is_enqueued();

				$this->get_script( 'section_visibility_js' )
					->set_type('js')
					->set_path( 'lib/js/frontend/section_visibility.js' )
					->set_deps(array($this->get_module('common')->get_script( 'is_in_viewport_js' )->get_handle()));
			}

			return $this;
		}
		private function add_metaboxes(): block_group_section_visibility{
			$states = array(
				'0' => __('Disabled', 'sv100'),
				'1' => __('Enabled', 'sv100')
			);

			$this->get_instance('sv100')->get_module('sv_metabox')->get_setting( $this->get_prefix('section_dynamic_visibility') )
				->set_title( __('Group Sections: Dynamic Visibility', 'sv100') )
				->set_description( __('Enable this to allow showing/hiding Block Group Sections.', 'sv100') )
				->set_default_value('0')
				->load_type( 'select' )
				->set_options($states);

			return $this;
		}

		public function section_dynamic_visibility_status(): bool{
			$section_status = $this->get_setting('section_dynamic_visibility')->get_data();
			$load_section_script		= false;
			if(is_string($section_status) && $section_status == 1){
				$load_section_script	= true;
			}
			if(is_array($section_status)){
				foreach($section_status as $section_status_responsive){
					if($section_status_responsive == 1){
						$load_section_script	= true;
					}
				}
			}

			return $load_section_script;
		}

		public function section_dynamic_visibility_status_post(): string{
			global $post;

			if (!$post) {
				return false;
			}

			if(!$this->section_dynamic_visibility_status()){
				return false;
			}

			$setting = $this->get_instance('sv100')->get_module('sv_metabox')->get_data($post->ID, $this->get_prefix('section_dynamic_visibility'), 0);

			return boolval($setting);
		}

		public function enqueue_scripts(): block_group_section_visibility {
			if(!$this->has_block_frontend('group')){
				return $this;
			}

			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

			return $this;
		}
	}