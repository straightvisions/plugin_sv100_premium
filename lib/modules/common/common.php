<?php
	namespace sv100_premium;

	class common extends modules {
		public function init(): common {
			$this->register_scripts();

			return $this;
		}
		protected function register_scripts(): common {
			$this->get_script( 'is_in_viewport_js' )
				->set_type('js')
				->set_path( 'lib/js/frontend/is_in_viewport.js' );

			return $this;
		}
	}