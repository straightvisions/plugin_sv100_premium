<?php
	namespace sv100_premium;

	class block_patterns extends modules {
		public function init(): block_patterns {
			$this->set_section_title( __( 'Custom Block Patterns', 'sv100_premium' ) )
				->set_section_type( 'settings' )
				->load_settings()
				->get_root()->add_section( $this );

			if($this->is_active()){
				add_action('init', array($this, 'register_post_type'));
				add_action('init', array($this, 'register_block_patterns'));
			}

			return $this;
		}
		protected function load_settings(): block_patterns {
			$this->get_setting( 'activate' )
				->set_title( __( 'Enable Custom Block Patterns', 'sv100' ) )
				->set_description( __( 'Create custom block patterns.', 'sv100' ) )
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
		public function register_post_type(): block_patterns{
			register_post_type('sv_block_patterns',
				array(
					'labels' => array(
						'name' => __('SV Block Patterns', 'sv100_premium'),
						'singular_name' => __('Block Pattern', 'sv100_premium'),
						'add_new_item' => __('Add New Block Pattern', 'sv100_premium'),
						'edit_item' => __('Edit Block Pattern', 'sv100_premium'),
					),
					'public' => false,
					'publicly_queryable' => false,
					'show_ui' => true,
					'exclude_from_search' => true,
					'show_in_menu' => true,
					'show_in_nav_menus' => false,
					'has_archive' => false,
					'hierarchical' => true,
					'show_in_rest' => true,
					'supports' => array('title', 'editor', 'revisions'),
					'taxonomies' => array('post_tag')
				)
			);

			return $this;
		}
		public function register_block_patterns(): block_patterns{
			$args	= array(
				'post_type'				=> 'sv_block_patterns',
				'numberposts'			=> -1
			);

			$patterns	= get_posts($args);

			if(!$patterns){
				return $this;
			}

			$this
				->register_default_category()
				->register_custom_categories();

			foreach($patterns as $pattern){
				// Support for Custom Tags
				$categories		= $this->get_post_tags($pattern->ID);

				$this->register_block_pattern($pattern, $categories);
			}

			return $this;
		}
		private function register_default_category(): block_patterns{
			// Default Category for all Custom Patterns
			register_block_pattern_category( 'sv-block-patterns', array( 'label' => __('SV Custom Block Patterns', 'sv100_premium') ));

			return $this;
		}
		private function register_custom_categories(): block_patterns{
			// Custom Categories by Tags
			$args = array(
				'type' => 'sv_block_patterns',
				'orderby' => 'name',
				'order' => 'ASC'
			);
			$tags = get_tags($args);
			foreach($tags as $tag) {
				register_block_pattern_category('sv-block-patterns-'.$tag->term_id, array('label' => $tag->name));
			}

			return $this;
		}
		private function get_post_tags(int $ID): array{
			$categories		= array('sv-block-patterns');
			$tags			= wp_get_post_tags($ID);

			if($tags){
				foreach($tags as $tag){
					$categories		= array_merge($categories,array('sv-block-patterns-'.$tag->term_id));
				}
			}

			return $categories;
		}
		private function register_block_pattern(\WP_Post $pattern, array $categories): block_patterns{
			register_block_pattern(
				'sv-block-patterns/'.$pattern->ID,
				array(
					'title'			=> $pattern->post_title,
					'content'		=> $pattern->post_content,
					'categories'	=> $categories
				)
			);

			return $this;
		}
	}