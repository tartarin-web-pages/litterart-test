
// Fonctionnalité du menu hamburger
document.getElementById('burger-menu').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('menu-active'); // Affiche ou cache le menu
});
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function scrollToTop(event) {
  event.preventDefault(); // Empêche l'ajout d'une nouvelle entrée dans l'historique
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Défilement fluide vers le haut
  });
}

// Stocke les articles d'origine avec leurs conteneurs parents
var originalArticles = [];
document.querySelectorAll('.article-item').forEach(function(article) {
    originalArticles.push({
        article: article,
        parent: article.parentNode // Enregistre le parent original de chaque article
    });
});

// Gestion de la recherche et du filtrage des articles
document.getElementById('search-bar').addEventListener('input', function() {
    var searchQuery = this.value.toLowerCase();
    var filteredResults = document.getElementById('filtered-results');
    var filteredTitle = document.getElementById('filtered-title');
    var clearSearch = document.getElementById('clear-search');
    var articleSection = document.getElementById('article-section');

    // Réinitialise le conteneur des résultats filtrés
    filteredResults.innerHTML = ''; 
    filteredResults.appendChild(filteredTitle); // S'assurer que le titre reste dans le conteneur

    if (searchQuery === '') {
        // Si la recherche est vide, rétablit tous les articles dans leur section d'origine
        originalArticles.forEach(function(item) {
            item.parent.appendChild(item.article); // Replace l'article dans sa section d'origine
            item.article.style.display = 'block'; // Réaffiche tous les articles
        });
        filteredResults.style.display = 'none'; // Masquer la section des résultats filtrés
        articleSection.style.display = 'flex'; // Réaffiche la section des articles originaux
        clearSearch.style.display = 'none'; // Masque la croix d'effacement
        filteredTitle.textContent = ''; // Vide le titre
    } else {
        clearSearch.style.display = 'block'; // Affiche la croix d'effacement
        var articlesFound = false; // Variable pour suivre s'il y a des résultats filtrés

        originalArticles.forEach(function(item) {
            var article = item.article;
            var title = article.querySelector('h3').textContent.toLowerCase();
            var content = article.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchQuery) || content.includes(searchQuery)) {
                // Déplace l'article filtré dans le conteneur des résultats filtrés
                filteredResults.appendChild(article);
                article.style.display = 'block'; // Affiche l'article correspondant
                articlesFound = true; // Il y a des résultats
            } else {
                article.style.display = 'none'; // Masque les articles qui ne correspondent pas
            }
        });

        // Affiche ou cache le conteneur des résultats filtrés
        if (articlesFound) {
            filteredResults.style.display = 'flex'; // Affiche les résultats filtrés
            articleSection.style.display = 'none'; // Cache la section des articles originaux
        } else {
            filteredResults.style.display = 'flex'; // Toujours afficher la section même sans résultats
        }
    }
});

// Gestion de l'événement de clic sur la croix d'effacement
document.getElementById('clear-search').addEventListener('click', function() {
    document.getElementById('search-bar').value = ''; // Vide la barre de recherche
    var event = new Event('input'); // Déclenche l'événement input pour actualiser les affichages
    document.getElementById('search-bar').dispatchEvent(event);
});

// Initialisation des événements pour les articles originaux
attachModalEvents();


