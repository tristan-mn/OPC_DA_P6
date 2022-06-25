function chercherMeilleurFilm(){
   fetch("http://localhost:8000/api/v1/titles?sort_by=-imdb_score")
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        }).then(function(value) {
            let id = value["results"][0]["id"].toString();
            fetch("http://localhost:8000/api/v1/titles/" + id)
                .then(function(res) {
                    if(res.ok)
                    return res.json();
                }).then(function(value){
                    
                    console.log(value);
                    console.log(value["description"]);

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



