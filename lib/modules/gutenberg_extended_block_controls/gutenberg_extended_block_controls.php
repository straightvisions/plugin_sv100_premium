<?php
	namespace sv100_premium;

	class gutenberg_extended_block_controls extends modules {
		private $rendered_blocks = array();
		
		
		public function init(): gutenberg_extended_block_controls {
			$this->set_section_title( __( 'Gutenberg Extended Block Controls', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				$this->register_scripts();
				add_action('wp', array($this, 'enqueue_scripts'));
			}
			
			// normal frontend call
			if( is_admin() === false && wp_doing_ajax() === false){
				add_filter('render_block', array($this, 'render_block_overwrite'), 99, 2);
				add_action( 'wp_footer', array( $this, 'get_frontend_block_styles' ), 99, 1 );
			}
			
			// ajax call
			if(wp_doing_ajax()){
				add_filter('render_block', array($this, 'render_block_overwrite'), 99, 2);
				add_action('the_content', array($this, 'parse_the_content'),99, 1);
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
				
				ob_start();
				require($this->get_path('lib/backend/js/config.json'));
				$config = json_decode(ob_get_clean());
				
				$this->get_script('controls')
				     ->set_path('lib/backend/js/dist/index.js')
				     ->set_type('js')
				     ->set_is_gutenberg()
				     ->set_is_backend()
				     ->set_deps(array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'))
				     ->set_localized(
				     	array_merge(
				     		$this->get_script('controls')->get_localized(),
				     	    array('config' => $config)
				        )
				     )
				     ->set_is_enqueued();
				
				$this->get_script( 'editor_components' )
				     ->set_is_backend()->set_is_gutenberg()->set_path( 'lib/backend/css/common/editor_components.css' );
				
				$this->get_script( 'common' )->set_is_gutenberg()->set_path( 'lib/backend/css/common/common.css' );
				$this->get_script( 'sv100-premium-block-core-mod-flex' )
				     ->set_inline()->set_is_gutenberg()->set_path( 'lib/backend/css/common/style_mod_flex.css' );
		
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
		
		/*
		 * load parsedCSSString from blocks within content
		 * inject the parsed CSS into the page
		 */
		public function get_frontend_block_styles(bool $as_return = false){
			$blocks = array();
			$output = '';
		
			$blocks = $this->rendered_blocks;
			
			foreach($blocks as $block){
				if(isset($block['attrs']) === false || isset($block['attrs']['parsedCSSString']) === false){continue;}
				$output .= $block['attrs']['parsedCSSString'];
			}
			
			$output = str_replace('#block-', '.block-', $output);
		
			$output = '<style id="sv100_premium_gutenberg_extended_block_control_styles">'.$output.'</style>'; //phpcs:ignore
			
			if($as_return){
				return $output;
			}else{
				echo $output;
			}
			
		}
		
		public function render_block_overwrite(string $block_content, array $block): string{
			$html = $block_content;
			$attrs = $block['attrs'];
			
			// add block for later css output in get_frontend_block_styles()
			if(isset($attrs['blockId']) && empty($attrs['blockId']) === false) {
				$this->rendered_blocks[ $attrs['blockId'] ] = $block;
			}
		
			// overwrites
			include($this->get_path('lib/frontend/tpl/stretch_link.php'));
			include($this->get_path('lib/frontend/tpl/poster_image.php'));
			
			// mod css
			if(isset($block['attrs']['_classNamesList']) && in_array('sv100-premium-block-core-mod-flex', $block['attrs']['_classNamesList']) === true){
				$this->get_script( 'sv100-premium-block-core-mod-flex-frontend' )->set_path( 'lib/backend/css/common/style_mod_flex.css' )->set_inline()->set_is_enqueued();
			}
			
			// add extra props to dynamic blocks
			if ( $block_content && isset( $block['attrs']['blockId'] ) ) {
				// add blockId class
				$injected_class = 'sv100-premium-block-core-' . $block['attrs']['blockId'];
				
				if(strpos($html, $injected_class) === false){ // prevent duplicates
					$html = preg_replace(
						'/' . preg_quote( 'class="', '/' ) . '/',
						'class="' . esc_attr( $injected_class ) . ' ',
						$block_content,
						1
					);
				}
				
			}
			
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
		
		/* add custom props to dynamic blocks which are not affected by blocks.getSaveContent.extraProps */
		public function add_block_extra_props( $block_content, $block ) {
			if ( ! $block_content || ! isset( $block['attrs']['foo'] ) ) {
				return $block_content;
			}
			
			$injected_class = 'foo-' . $block['attrs']['foo'];
			return preg_replace(
				'/' . preg_quote( 'class="', '/' ) . '/',
				'class="' . esc_attr( $injected_class ) . ' ',
				$block_content,
				1
			);
		}
		
		public function parse_the_content($content){
			$content .= $this->get_frontend_block_styles(true);
			
			return $content;
		}
	
	}