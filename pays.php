<?php
/**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/ChristopherRedZ
Version: 1.0.0
Description: Permet d'afficher les destinations par pays
*/
echo header("Access-Control-Allow-Origin: http://localhost");

function pays_enqueue() {
    // Enqueue styles and scripts
    $version_css = filemtime(plugin_dir_path(__FILE__) . "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
    wp_enqueue_style('pays_plugin_css', plugin_dir_url(__FILE__) . "style.css", array(), $version_css);
    wp_enqueue_script('pays_plugin_js', plugin_dir_url(__FILE__) . "js/pays.js", array(), $version_js, true);
}
add_action('wp_enqueue_scripts', 'pays_enqueue');

// Fonction pour créer des bouttons basé sur les noms de pays si dessous
function creation_bouton_pays() {
    $LesPays = array("France", "États-Unis", "Canada", "Argentine", "Chili", "Belgique", "Maroc", "Mexique", "Japon", "Italie", "Islande", "Chine", "Grèce", "Suisse");
    $boutons = '';

    foreach ($LesPays as $Pays) {
        $boutons .= '<button class="bouton-pays" data-nom-pays="' . esc_attr($Pays) . '">' . esc_html($Pays) . '</button>';
    }

    return $boutons;
}

// Fonction pour créer la liste de destination
function creation_destinations_pays() {
    $boutons = creation_bouton_pays();
    $contenu = '<div class="boutons-pays">' . $boutons . '</div>
    <div class="contenu-restapi"></div>';
    return $contenu;
}

add_shortcode('pays_destination', 'creation_destinations_pays');
?>
