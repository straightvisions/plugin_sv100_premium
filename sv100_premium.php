<?php
/*
Version: 1.9.04
Plugin Name: SV100 Premium
Text Domain: sv100_premium
Description: Outstanding Premium Features for SV100 Theme
Plugin URI: https://straightvisions.com/
Author: straightvisions GmbH
Author URI: https://straightvisions.com/
Domain Path: /languages
License: GPL-3.0-or-later
License URI: https://www.gnu.org/licenses/gpl-3.0-standalone.html
*/

namespace sv100_premium;

if(!class_exists('\sv_dependencies\init')){
	require_once( 'lib/core_plugin/dependencies/sv_dependencies.php' );
}

if ( $GLOBALS['sv_dependencies']->set_instance_name( 'SV100 Premium' )->check_php_version() ) {
	require_once( dirname(__FILE__) . '/init.php' );
} else {
	$GLOBALS['sv_dependencies']->php_update_notification()->prevent_plugin_activation();
}