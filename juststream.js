function chercherFilmInfos(lienFilm){
    lienFilm = "http://localhost:8000/api/v1/titles/11207902";
    fetch(lienFilm)
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    }).then(function(value){
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

        console.log(infosFilm);
    }).catch(function(err) {
        console.log(err);
    });
}

chercherFilmInfos();



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


function chercherSeptMeilleursFilms(){

    fetch("http://localhost:8000/api/v1/titles/?page=1&sort_by=-imdb_score")
    .then(function(res) {
        if(res.ok)
        return res.json();
    }).then(function(value){
        films = [];
        premierFilm = value["results"][1]["url"];
        secondFilm = value["results"][2]["url"];
        troisiemeFilm = value["results"][3]["url"];
        quatriemeFilm = value["results"][4]["url"];
        films.push(premierFilm, secondFilm, troisiemeFilm, quatriemeFilm);
        for(i of films){
            fetch(i)
            .then(function(res){
                if (res.ok)
                return res.json();
            }).then(function(value){
                console.log(value);
            }).catch(function(err){
                console.log(err);
            })
        }

    })
    .catch(function(err) {
      console.log(err);
  });

    fetch("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score")
    .then(function(res) {
        if(res.ok)
        return res.json();
    }).then(function(value){
        // console.log(value);

    })
    .catch(function(err) {
      console.log(err);
  });
}

chercherSeptMeilleursFilms();