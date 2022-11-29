# Installer l'api Python Django OpenClassrooms

1. Vous devez clonner et installer l'api Python Django fournie par OpenClassrooms pour ce projet :

```shell
$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande :

```shell
$ cd ocmovies-api-fr
```

3. Créer un environnement virtuel pour le projet avec `$ python -m venv env` sous windows ou `$ python3 -m venv env` sous macos ou linux.

4. Activez l'environnement virtuel avec `$ env\Scripts\activate` sous windows ou `$ source env/bin/activate` sous macos ou linux

5. Installez les dépendances du projet avec la commande `$ pip install -r requirements.txt`

6. Créer et alimenter la base de données avec la commande `$ python manage.py create_db`

7. Démarrer le serveur avec `$ python manage.py runserver`

# Téléchargez le code source de ce projet (partie frontend)

Utilisez la commande ci-dessous pour télécharger le code source de ce projet:

```shell
$ git clone https://github.com/iuliancojocari/oc_6_ocmovies.git
```

# Lancer la partie frontend

1. Ouvrez le terminal sur votre ordinateur et rendez-vous à la racine du répertoire qui contient le code source `$ cd oc_6_movies`

2. Lancez un serveur http à l'aide de la commande :

```shell
$ python http.server 8001
```
