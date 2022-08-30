<?php
	namespace sv100_premium;
	
	class modules extends init {
		public function init() {
			$this->load_module('common');
			$this->load_module('gutenberg_extended_block_controls');
			$this->load_module('block_group_sticky');
			$this->load_module('block_group_toggle');
			$this->load_module('block_group_flip');
			$this->load_module('custom_lightbox');
			$this->load_module('block_patterns');
			$this->load_module('scroll_progress_bar');
			$this->load_module('insert_post');
			//$this->load_module('query_infinite_scroll');
		}
	}