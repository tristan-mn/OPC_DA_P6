/**
 * une fonction asynchrone permettant d'aller récupérer des informations pour un film
 * @param {str} lienFilm 
 * @returns un objet javascript avec toutes les informations pour un film
 */

async function chercherFilmInfos(lienFilm){

    return await fetch(lienFilm)
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    }).then(function (value){
        let infosFilm = new Object();
        infosFilm.image = value["image_url"];
        infosFilm.titre = value["title"];
        infosFilm.genre = value["genres"];
        infosFilm.dateSortie = value["date_published"];
        infosFilm.rated = value["rated"];
        infosFilm.scoreImdb = value["imdb_score"];
        infosFilm.realisateur = value["directors"];
        infosFilm.acteurs = value["actors"];
        infosFilm.duree = value["duration"];
        infosFilm.paysOrigine = value["countries"];
        infosFilm.resultatBoxOffice = value["avg_vote"];
        infosFilm.resume = value["long_description"];
        return infosFilm;
    }).catch(function(err) {
        console.log(err);
    });
    
};


/**
 * fonction qui va créer une nouvelle fenêtre en affichant l'intérieur 
 * les informations du film donné en paramètre
 * @param {object} film 
 */
function creerModal(film){

    let modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.appendChild(modal);

    let contenuModal = document.createElement("div")
    contenuModal.setAttribute("id", "modal_content")

    let titre = document.createElement("p");
    titre.textContent = "Titre : " + film["titre"];
    let fermerModal = document.createElement("span");
    fermerModal.setAttribute("id", "fermerModal");
    fermerModal.textContent = "X";

    let image = document.createElement("img");
    image.src = film["image"];
    image.style.width = "40%";
    image.style.height = "40%";
    image.style.paddingLeft = "30%";
    let genre = document.createElement("p")
    genre.textContent = "genre : " + film["genre"];
    let dateSortie = document.createElement("p");
    dateSortie.textContent = "date de sortie : " + film["dateSortie"];
    let rated = document.createElement("p");
    rated.textContent = "note : " + film["rated"];
    let imdb = document.createElement("p");
    imdb.textContent = "Score IMDB : " + film["scoreImdb"];
    let realisteur = document.createElement("p");
    realisteur.textContent = "Réalisateur.s : " + film["realisateur"];
    let acteurs = document.createElement("p");
    acteurs.textContent = "Acteurs : " + film["acteurs"];
    let duree = document.createElement("p");
    duree.textContent = "Durée du film : " + film["duree"];
    let pays = document.createElement("p");
    pays.textContent = "Pays : " + film["paysOrigine"];
    let resultBoxOffice = document.createElement("p");
    resultBoxOffice.textContent = "Résulat au box office : " + film["resultatBoxOffice"];
    let description = document.createElement("p");
    description.textContent = "Description : " + film["resume"];
    contenuModal.appendChild(fermerModal);
    contenuModal.appendChild(image);
    contenuModal.appendChild(titre);
    contenuModal.appendChild(genre);
    contenuModal.appendChild(dateSortie);
    contenuModal.appendChild(rated);
    contenuModal.appendChild(imdb);
    contenuModal.appendChild(realisteur);
    contenuModal.appendChild(acteurs);
    contenuModal.appendChild(duree);
    contenuModal.appendChild(pays);
    contenuModal.appendChild(resultBoxOffice);
    contenuModal.appendChild(description);
    modal.appendChild(contenuModal);

    let croix = document.getElementById("fermerModal"); 
    croix.addEventListener("click", function() {
    document.body.removeChild(modal)
  })
};


/**
 * cette fonction va chercher dans l'api le film le mieux noter
 * affiche ensuite l'image, le titre et le résumé du film sur la page html
 */
function chercherMeilleurFilm(){
   fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        }).then(async function(value) {
            let urlFilm = value["results"][0]["url"];
            let meilleurFilmInfos = await chercherFilmInfos(urlFilm);
            let titreFilm = document.createElement("h3")
            titreFilm.textContent = meilleurFilmInfos["titre"];
            let divTitre = document.getElementById("meilleur_film_titre")
            divTitre.appendChild(titreFilm)
            let descriptionFilm = document.getElementById("meilleur_film_description");
            descriptionFilm.textContent = meilleurFilmInfos["resume"];
            let image = document.createElement("img")
            image.setAttribute("id", "meilleur_film_image")
            image.src = meilleurFilmInfos["image"]
            let divImage = document.getElementById("div_meilleur_film_image")
            divImage.appendChild(image)
            let meilleurFilmBouton = document.getElementById("meilleur_film_bouton");
            //  si l'utilisateur clique sur le bouton le modal est créé
            // le modal s'affiche sur la page
            meilleurFilmBouton.addEventListener("click", function(){
                creerModal(meilleurFilmInfos);
            })

                })
                  .catch(function(err) {
                    console.log(err);
                });
 }
       

chercherMeilleurFilm();


/**
 * 
 * @param {str} premierLien le lien de la premiere page affichant les films
 * @param {str} deuxiemeLien le lien de la deuxieme page affichant les films
 * @param {str} id nom de l'id de la div contenant les 7 films pour la catégorie choisie
 */
async function afficherSeptFilms(premierLien, deuxiemeLien, id){
    await fetch(premierLien)
    .then(function(res) {
        if(res.ok)
        return res.json();
    }).then(async function(value){
        films = [];
        // on va d'abord chercher les liens url pour chaque film 
        let premierFilmLien = value["results"][1]["url"];
        let secondFilmLien = value["results"][2]["url"];
        let troisiemeFilmLien = value["results"][3]["url"];
        let quatriemeFilmLien = value["results"][4]["url"];
        films.push(premierFilmLien, secondFilmLien, troisiemeFilmLien, quatriemeFilmLien);

        let categorieFilm = document.getElementById(id);

        // Pour chaque film on va récupérer les informations
        // ajouter l'image du film
        // ecouter l'évenement du click sur l'image pour afficher une fenêtre modal
        let premierFilmInfos = await chercherFilmInfos(films[0]);
        let imagePremierFilm = document.createElement("img");
        let divPremierFilm = document.createElement("div");
        divPremierFilm.classList.add("slide");
        categorieFilm.appendChild(divPremierFilm);
        divPremierFilm.appendChild(imagePremierFilm);
        imagePremierFilm.src = premierFilmInfos["image"];
        imagePremierFilm.addEventListener("click", function(){
            creerModal(premierFilmInfos);
        })
        
        let secondFilmInfos =  await chercherFilmInfos(films[1]);
        let imageSecondFilm = document.createElement("img");
        let divSecondFilm = document.createElement("div");
        divSecondFilm.classList.add("slide");
        categorieFilm.appendChild(divSecondFilm);
        divSecondFilm.appendChild(imageSecondFilm);
        imageSecondFilm.src = secondFilmInfos["image"];
        imageSecondFilm.addEventListener("click", function(){
            creerModal(secondFilmInfos);
        })
        
        let troisiemeFilmInfos = await chercherFilmInfos(films[2]);
        let imageTroisiemeFilm = document.createElement("img");
        let divTroisiemeFilm = document.createElement("div");
        divTroisiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divTroisiemeFilm);
        divTroisiemeFilm.appendChild(imageTroisiemeFilm);
        imageTroisiemeFilm.src = troisiemeFilmInfos["image"];
        imageTroisiemeFilm.addEventListener("click", function(){
            creerModal(troisiemeFilmInfos);
        })
        
        let quatriemeFilmInfos = await chercherFilmInfos(films[3]);
        let imageQuatriemeFilm = document.createElement("img");
        let divQuatriemeFilm = document.createElement("div");
        divQuatriemeFilm.classList.add("slide");
        categorieFilm.appendChild(divQuatriemeFilm);
        divQuatriemeFilm.appendChild(imageQuatriemeFilm);
        imageQuatriemeFilm.src = quatriemeFilmInfos["image"];
        imageQuatriemeFilm.addEventListener("click", function(){
            creerModal(quatriemeFilmInfos);
        })

    })
    .catch(function(err) {
        console.log(err);
    });

    await fetch(deuxiemeLien)
    .then(function(res) {
        if(res.ok)
        return res.json();
    }).then(async function(value){
        let cinquiemeFilmLien = value["results"][0]["url"];
        let sixiemeFilmLien = value["results"][1]["url"];
        let septiemeFilmLien = value["results"][2]["url"];
        films.push(cinquiemeFilmLien , sixiemeFilmLien, septiemeFilmLien);
        let categorieFilm = document.getElementById(id);

        let cinquiemeFilmInfos = await chercherFilmInfos(films[4]);
        let imagecinquiemeFilm = document.createElement("img");
        let divCinquiemeFilm = document.createElement("div");
        divCinquiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divCinquiemeFilm);
        divCinquiemeFilm.appendChild(imagecinquiemeFilm);
        imagecinquiemeFilm.src = cinquiemeFilmInfos["image"];
        imagecinquiemeFilm.addEventListener("click", function(){
            creerModal(cinquiemeFilmInfos);
        })
        
        let sixiemeFilmInfos = await chercherFilmInfos(films[5]);
        let imagesixiemeFilm = document.createElement("img");
        let divSixiemeFilm = document.createElement("div");
        divSixiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divSixiemeFilm);
        divSixiemeFilm.appendChild(imagesixiemeFilm);
        imagesixiemeFilm.src = sixiemeFilmInfos["image"];
        imagesixiemeFilm.addEventListener("click", function(){
            creerModal(sixiemeFilmInfos);
        })
        
        let septiemeFilmInfos = await chercherFilmInfos(films[6]);
        let imageSeptiemeFilm = document.createElement("img");
        let divSeptiemeFilm = document.createElement("div");
        divSeptiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divSeptiemeFilm);
        divSeptiemeFilm.appendChild(imageSeptiemeFilm);
        imageSeptiemeFilm.src = septiemeFilmInfos["image"];
        imageSeptiemeFilm.addEventListener("click", function(){
            creerModal(septiemeFilmInfos);
        })
        
    })
    .catch(function(err) {
        console.log(err);
    });
}

/**
 * Pour chaque catégorie de films on affiche 7 films 
 */
async function afficherTousFilms(){
    let premierePageMeilleursFilms = "http://localhost:8000/api/v1/titles/?page=1&sort_by=-imdb_score";
    let deuxiemePageMeilleursFilms = "http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score";
    let categorieMeilleursFilms = "contenu_carousel_sept_meilleurs_films";
    
    septMeilleursFilm = await afficherSeptFilms(premierePageMeilleursFilms, deuxiemePageMeilleursFilms, categorieMeilleursFilms);
    
    
    let premierePageMeilleursFilmsAnimation = "http://localhost:8000/api/v1/titles/?genre=Animation&page=1&sort_by=-imdb_score";
    let deuxiemePageMeilleursFilmsAnimation = "http://localhost:8000/api/v1/titles/?genre=Animation&page=2&sort_by=-imdb_score";
    let categorieFilmsAnimation = "contenu_carousel_premiere_categorie";
    
    septMeilleursFilmAnimation = await afficherSeptFilms(premierePageMeilleursFilmsAnimation, deuxiemePageMeilleursFilmsAnimation, categorieFilmsAnimation);
    
    let premierePageMeilleursFilmsSport = "http://localhost:8000/api/v1/titles/?genre=Sport&page=1&sort_by=-imdb_score";
    let deuxiemePageMeilleursFilmsSport = "http://localhost:8000/api/v1/titles/?genre=Sport&page=2&sort_by=-imdb_score";
    let categorieFilmsSport = "contenu_carousel_deuxieme_categorie";

    septMeilleursFilmSport =  await afficherSeptFilms(premierePageMeilleursFilmsSport, deuxiemePageMeilleursFilmsSport, categorieFilmsSport);

    let premierePageMeilleursFilmsSciFi = "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page=1&sort_by=-imdb_score";
    let deuxiemePageMeilleursFilmsSciFi = "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&page=2&sort_by=-imdb_score";
    let categorieFilmsSciFi = "contenu_carousel_troisieme_categorie";

    septMeilleursFilmSciFi = await  afficherSeptFilms(premierePageMeilleursFilmsSciFi, deuxiemePageMeilleursFilmsSciFi, categorieFilmsSciFi);
}

let afficherFilms = afficherTousFilms();


/**
 * 
 * @param {int} index index de base
 * @param {str} id nom de l'id de la div contenant les 7 films pour la catégorie choisie
 */
function bougerCarousel(index, id){
    let contenu = document.querySelector(id);
    boutonPrecedent = contenu.nextElementSibling;
    boutonPrecedent.addEventListener('click', function(){
        index = index + 15;
        contenu.style.transform = "translate("+ index +"%)";
    });
    let boutonSuivant = boutonPrecedent.nextElementSibling;
    boutonSuivant.addEventListener('click', function(){
        index = index - 15;
        contenu.style.transform = "translate("+ index +"%)";
    });
};

let bougerSeptMeilleursFilms = bougerCarousel(0, "#contenu_carousel_sept_meilleurs_films");
let bougerPremiereCategorie = bougerCarousel(0, "#contenu_carousel_premiere_categorie");
let bougerDeuxiemeCategorie = bougerCarousel(0, "#contenu_carousel_deuxieme_categorie");
let bougerTroisiemeCategorie = bougerCarousel(0, "#contenu_carousel_troisieme_categorie");



