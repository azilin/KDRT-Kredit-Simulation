<?php
/*
Plugin Name: KDRT Kredit Simulation
Plugin URI: http://bprkedungarto.com/simulasi-kredit
Description: Plugin formulir simulasi Kredit untuk BPR Kedungarto
Version: 1.1.0
Author: gentjv
Author URI: https://rumahnanas.com/
*/


function my_kpr_scripts() {  
  if(is_page(424)){
    wp_enqueue_script( 'kpr_js_script', plugins_url('/js/app.js', __FILE__ ));
    wp_enqueue_script( 'accounting_js_script', plugins_url('/js/accounting.js', __FILE__ ));
    wp_enqueue_script( 'jquery_inputmask_bundle', plugins_url("js/jquery.inputmask.bundle.min.js", __FILE__)); 
    wp_enqueue_script( 'jquery_inputmask_binding', plugins_url("js/inputmask.binding.min.js", __FILE__));
    wp_enqueue_style( 'kredit_simulation', plugins_url('/css/styles.css', __FILE__ ));

  }
  
}
//add_action( 'wp_enqueue_scripts', 'my_kpr_scripts' );
function nks_load_form()
{
	if ( !is_admin()) {     
          ob_start();
          include( plugin_dir_path( __FILE__ ) . 'views/form.php');
          // include( plugin_dir_path( __FILE__ ) . 'views/form-simulasi.php');
          return ob_get_clean();
     }  
    
}
add_shortcode('kdrt_simulation_form', 'nks_load_form');
