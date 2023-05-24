<?php
	namespace sv100_premium;

	class insert_post extends modules {
		public function init(): insert_post {
			// sv100_premium_insert_post
			add_shortcode( $this->get_prefix(), array( $this, 'shortcode' ) );

			return $this;
		}
		public function shortcode( $atts, $content = null ){
			$atts = shortcode_atts(
				array(
					'id'          => '',
				),
				$atts,
				$this->get_prefix()
			);

			$post		= get_post(intval( $atts['id']));

			if($post){
				// sv100_premium_insert_post_id
				add_filter($this->get_prefix('id'), function() use($atts){ return $atts['id']; });

				return apply_filters('the_content', $post->post_content);
			}

			return '';
		}
	}