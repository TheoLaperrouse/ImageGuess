# Celebrity Guess

## Explication

Projet en vue de l'utilisation de plusieurs librairies (TailwindCSS / Semantic Release / Vue 3)

Consiste en un jeu de reconnaissance de célébrités, une photo s'affiche et nous devons reconnaitre la célébrité.

Le jeu dure 60 secondes et à chaque bonne réponse, un point est ajouté.

## Mise en place

Assurer vous d'être en node 18, puis installer les dépendances :
```sh
npm install --production=true
```
ou
```sh
yarn install --production=true
```

Éditer le fichier src/assets/celebritiesInfos.json pour y ajouter des célébrités :
```json
[
    {
        "name":"Théo Laperrouse",
        "url":"https://avatars.githubusercontent.com/u/31164468?v=4"
    }
]
```

Puis lancer l'application :
```sh
npm run start
```
ou
```sh
yarn start
```