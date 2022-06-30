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



function chercherMeilleurFilm(){
   fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        }).then(function(value) {
            let urlFilm = value["results"][0]["url"];
            fetch(urlFilm)
                .then(function(res) {
                    if(res.ok)
                    return res.json();
                }).then(function(value){

                    let titreFilm = document.getElementById("meilleur_film_titre");
                    titreFilm.textContent = value["title"];

                    let descriptionFilm = document.getElementById("meilleur_film_description");
                    descriptionFilm.textContent = value["description"];


                    let image = document.getElementById("meilleur_film_image");
                    image.src = value["image_url"];
                    image.style.marginBottom = "0px";
                    image.style.width = "55vw";
                    image.style.height = "400px";


                })
                  .catch(function(err) {
                    console.log(err);
                });

        })
        .catch(function(err) {
            console.log(err);
        });
}

chercherMeilleurFilm();


async function afficherSeptFilms(premierLien, deuxiemeLien, id){
    
    await fetch(premierLien)
    .then(function(res) {
        if(res.ok)
        return res.json();
    }).then(async function(value){
        films = [];
        let premierFilmLien = value["results"][1]["url"];
        let secondFilmLien = value["results"][2]["url"];
        let troisiemeFilmLien = value["results"][3]["url"];
        let quatriemeFilmLien = value["results"][4]["url"];
        films.push(premierFilmLien, secondFilmLien, troisiemeFilmLien, quatriemeFilmLien);
        let categorieFilm = document.getElementById(id);

        let premierFilmInfos = await chercherFilmInfos(films[0]);
        let imagePremierFilm = document.createElement("img");
        let divPremierFilm = document.createElement("div");
        divPremierFilm.classList.add("slide");
        categorieFilm.appendChild(divPremierFilm);
        divPremierFilm.appendChild(imagePremierFilm);
        imagePremierFilm.src = premierFilmInfos["image"];

        let secondFilmInfos =  await chercherFilmInfos(films[1]);
        let imageSecondFilm = document.createElement("img");
        let divSecondFilm = document.createElement("div");
        divSecondFilm.classList.add("slide");
        categorieFilm.appendChild(divSecondFilm);
        divSecondFilm.appendChild(imageSecondFilm);
        imageSecondFilm.src = secondFilmInfos["image"];

        let troisiemeFilmInfos = await chercherFilmInfos(films[2]);
        let imageTroisiemeFilm = document.createElement("img");
        let divTroisiemeFilm = document.createElement("div");
        divTroisiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divTroisiemeFilm);
        divTroisiemeFilm.appendChild(imageTroisiemeFilm);
        imageTroisiemeFilm.src = troisiemeFilmInfos["image"];

        let quatriemeFilmInfos = await chercherFilmInfos(films[3]);
        let imageQuatriemeFilm = document.createElement("img");
        let divQuatriemeFilm = document.createElement("div");
        divQuatriemeFilm.classList.add("slide");
        categorieFilm.appendChild(divQuatriemeFilm);
        divQuatriemeFilm.appendChild(imageQuatriemeFilm);
        imageQuatriemeFilm.src = quatriemeFilmInfos["image"];

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

        let sixiemeFilmInfos = await chercherFilmInfos(films[5]);
        let imagesixiemeFilm = document.createElement("img");
        let divSixiemeFilm = document.createElement("div");
        divSixiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divSixiemeFilm);
        divSixiemeFilm.appendChild(imagesixiemeFilm);
        imagesixiemeFilm.src = sixiemeFilmInfos["image"];

        let septiemeFilmInfos = await chercherFilmInfos(films[6]);
        let imageSeptiemeFilm = document.createElement("img");
        let divSeptiemeFilm = document.createElement("div");
        divSeptiemeFilm.classList.add("slide");
        categorieFilm.appendChild(divSeptiemeFilm);
        divSeptiemeFilm.appendChild(imageSeptiemeFilm);
        imageSeptiemeFilm.src = septiemeFilmInfos["image"];

    })
    .catch(function(err) {
      console.log(err);
  });
}


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



function bougerPremierCarousel(debutIndex){
 var index = 0;
 let contenu = document.querySelector("#contenu_carousel_sept_meilleurs_films");
 boutonPrecedent = contenu.nextElementSibling;
 boutonPrecedent.addEventListener('click', function(){
    index = index +20;
    let carousel1 = document.getElementById("contenu_carousel_sept_meilleurs_films");
    carousel1.style.transform = "translate("+ index +"%)";
  });
 let boutonSuivant = boutonPrecedent.nextElementSibling;
 boutonSuivant.addEventListener('click', function(){
    index = index -20;
    let carousel1 = document.getElementById("contenu_carousel_sept_meilleurs_films");
    carousel1.style.transform = "translate("+ index +"%)";
  });


};

bougerPremierCarousel();







