(function() {
    console.log("Pays API");

    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.bouton-pays');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const NomsPays = this.getAttribute('data-country-name');
                fetchPostsByCountry(NomsPays);
            });
        });
    });

    function fetchPostsByCountry(NomsPays) {
        let url = `https://gftnth00.mywhc.ca/tim26/wp-json/wp/v2/posts?search=${encodeURIComponent(NomsPays)}`;

        // Efface le contenu Précédent
        let restapi = document.querySelector(".contenu-restapi");
        restapi.innerHTML = '';

        // Performe une requete fetch
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("La requête a échoué avec le statut " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                // Produit les posts fetched
                data.forEach(function(article) {
                    let titre = article.title.rendered;
                    let contenu = article.content.rendered;
                    console.log(titre);
                    let carte = document.createElement("div");
                    carte.classList.add("carte-restapi");

                    carte.innerHTML = `
                        <h2>${titre}</h2>
                        <p>${contenu}</p>
                    `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function(error) {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
})();
