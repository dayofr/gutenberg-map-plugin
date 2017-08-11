<?php

/*
Plugin Name: Gutenberg static Google Map
Plugin URI: https://github.com/dayofr/gutenberg-map-plugin
Description: A Gutenberg plugin to add a static Google map
Version: 0.7
Author: Dayo
Author URI: https://blog.dayo.fr/
*/

function dayo_gutenberg_map_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'dayo_gutenberg_map',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);
}

add_action( 'enqueue_block_editor_assets', 'dayo_gutenberg_map_enqueue_block_editor_assets' );
