<?php
	namespace sv100_premium;

	class query_infinite_scroll extends modules {
		public function init(): query_infinite_scroll {
			$this->set_section_title( __( 'Infinite Scroll', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->set_section_template_path( $this->get_path( 'lib/tpl/settings/init.php' ) )
				->load_settings()
				->register_scripts()
				->get_root()->add_section( $this );

			add_action('wp', function(){
				if($this->is_active()){
					add_action( 'pre_get_posts', array($this, 'pre_get_posts') );
				}
			});

			return $this;
		}
		public function pre_get_posts( \WP_Query $q ) {
			if(!is_main_query()){
				return;
			}

			if($q->get('post_type') !== 'wp_template'){
				return;
			}

			var_dump($q);

			$this->enqueue_scripts();
		}
		protected function load_settings(): query_infinite_scroll {
			$this->get_setting( 'activate' )
			     ->set_title( __( 'Activate Infinite Scroll for Main Archive Queries', 'sv100' ) )
			     ->set_description( __( 'Works with Gutenberg Query Block.', 'sv100' ) )
			     ->load_type( 'checkbox' );

			return $this;
		}
		protected function register_scripts(): query_infinite_scroll {
			$this->get_script( 'common' )
				->set_path( 'lib/css/common/common.css' )
				->set_inline( true );

			$this->get_script( 'init' )
				->set_type('js')
				->set_path( 'lib/js/frontend/init.js' );

			return $this;
		}
		public function enqueue_scripts(): query_infinite_scroll {
			foreach($this->get_scripts() as $script){
				$script->set_is_enqueued();
			}

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

			// archive queries only
			if(!is_archive()){
				return false;
			}

			return true;
		}
	}