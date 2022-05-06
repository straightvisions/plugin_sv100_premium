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
			
			if( is_admin() === false && wp_is_json_request() === false){
				add_action( 'wp_footer', array( $this, 'get_frontend_block_styles' ), 1 );
				add_filter('render_block', array($this, 'render_block_overwrite'), null, 2);
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
				
				$this->get_script( 'common' )->set_is_gutenberg()->set_path( 'lib/backend/css/common/common.css' );
				$this->get_script( 'editor_components' )->set_is_gutenberg()->set_path( 'lib/backend/css/common/editor_components.css' );
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
		
		function get_block_children( $blocks ) {
			$list = array();
			
			foreach ( $blocks as $block ) {
				if ( 'core/heading' === $block['blockName'] ) {
					// add current item, if it's a heading block
					
					$list[] = $block;
				} elseif ( ! empty( $block['innerBlocks'] ) ) {
					// or call the function recursively, to find heading blocks in inner blocks
					$list = array_merge( $list, $this->get_block_children( $block['innerBlocks'] ) );
				}
			}
			
			return array_merge($list, $blocks);
		}
		
		public function get_frontend_block_styles(){
			global $post;
			$blocks = array();
			$output = '';
			
			if ( is_object( $post ) ) {
				$blocks = parse_blocks( $post->post_content );
			}
			
			// get inner blocks
			$blocks = $this->get_block_children($blocks);
			
			foreach($blocks as $block){
				if(isset($block['attrs']) === false || isset($block['attrs']['parsedCSSString']) === false){continue;}
				$output .= $block['attrs']['parsedCSSString'];
			}
			
			$output = str_replace('#block-', '.block-', $output);
			
			echo '<style id="sv100_premium_gutenberg_extended_block_control_styles">'.$output.'</style>'; //phpcs:ignore
		}
		
		public function render_block_overwrite(string $block_content, array $block): string{
			$html = $block_content;
			$attrs = $block['attrs'];
			
			// overwrites
			include($this->get_path('lib/frontend/tpl/stretch_link.php'));
			include($this->get_path('lib/frontend/tpl/poster_image.php'));
			
			return $html;
		}
		
		/* experimental */
		private function HTML_append(string $html, string $element, array $block){
			$html = rtrim($html);
			$name = $block['blockName'];
			
			// div based wrappers
			if(strpos($html, '</div>', -6) !== false){
				$html = substr_replace($html, $element . '</div>', -6);
			}
			
			// image based wrappers
			if(strpos($html, '</figure>', -9) !== false){
				$html = substr_replace($html, $element . '</figure>', -9);
			}
			
			return $html;
		}
	}