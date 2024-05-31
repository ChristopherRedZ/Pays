(function() {
    console.log("Pays API");

    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.bouton-pays');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const NomsPays = this.getAttribute('data-nom-pays');
                fetchPostsParPays(NomsPays);
            });
        });
    });

    function fetchPostsParPays(NomsPays) {
        console.log("Fetching data for " + NomsPays);
        
        //Recherche des noms des pays avec le paramètre _embed
        let url = `https://gftnth00.mywhc.ca/tim26/wp-json/wp/v2/posts?search=${encodeURIComponent(NomsPays)}&_embed`;

        // Efface le contenu Précédent
        let restapi = document.querySelector(".contenu-restapi");
        restapi.innerHTML = '';

        // Performe une requete fetch
        console.log("API URL: " + url);
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("La requête a échoué avec le statut " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                console.log("Received data:");
                console.log(data); // Log the data to inspect the API response
                // Produit les posts fetched
                data.forEach(function(article) {
                    console.log("Processing article:");
                    console.log(article);

                    let titre = article.title.rendered;
                    let contenu = article.content.rendered;
                    // Vérifie les médias intégrés pour l'image en vedette
                    let thumbnail = article._embedded && article._embedded['wp:featuredmedia'] && article._embedded['wp:featuredmedia'][0] ? article._embedded['wp:featuredmedia'][0].source_url : '';
                    console.log("Thumbnail URL: " + thumbnail);
                    
                    // Utilise une image de remplacement si aucun aperçu n'est disponible
                    if (!thumbnail) {
                        console.log("No thumbnail found. Using placeholder image.");
                        thumbnail = 'https://via.placeholder.com/150'; // Placeholder image URL
                    }

                    console.log(titre);
                    let carte = document.createElement("div");
                    carte.classList.add("carte-restapi");
                    // Application des carte créer dans la page
                    carte.innerHTML = `
                        <img src="${thumbnail}" alt="${titre}" class="thumbnail">
                        <h2>${titre}</h2>
                        <p>${contenu}</p>
                    `;
                    restapi.appendChild(carte);
                });
            })
            // Phrase d'erreur dans le cas contraire
            .catch(function(error) {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
})();
