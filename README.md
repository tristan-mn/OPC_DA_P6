### Openclassroom projet 06


Dans le cadre de ce projet je devais concevoir un site ressemblant à netflix.
Pour celà je devais importer les données à partir d'une api avec Javascript.

## Installation et lancement de l'API

### Installation

Étape à effectuer une seule fois :

```bash
$ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
$ cd OCMovies-API-EN-FR
$ python3 -m venv env (Sous Windows => python -m venv env)
$ source env/bin/activate (Sous Windows => env\Scripts\activate)
$ pip install -r requirements.txt
$ python manage.py create_db
```

### Lancement

Étape à répéter à chaque utilisation

```bash
$ source env/bin/activate (Sous Windows => env\Scripts\activate)
$ python manage.py runserver
$ pour finir cliquer sur le lien [http://localhost:8000/api/v1/titles/]
```

## Usage

Lancez le fichier JustStreamit.html avec votre navigateur.   
En tête d'affiche se trouve le film le mieux noté toutes catégories confondues.   
Ensuite un classement des septs films les mieux notés toutes catégories confondues.   
Pour finir, le même classement s'opère pour les catégories Animation, Sport et Science-fiction.   