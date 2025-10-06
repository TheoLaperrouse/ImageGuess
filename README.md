# Image Guess

## Explication

Projet en vue de l'utilisation de plusieurs librairies (TailwindCSS / Semantic Release / Vue 3)

Consiste en un jeu de reconnaissance d'image, une image s'affiche et nous devons reconnaitre l'image.

Le jeu dure 60 secondes et à chaque bonne réponse, un point est ajouté.

## Mise en place

Assurer de mettre des variables dans le .env en utilisant Supabase

Assurer vous d'être en node 20, puis installer les dépendances :
```sh
npm install
```
ou
```sh
yarn
```

Puis lancer l'application :
```sh
npm run start
```
ou
```sh
yarn start
```

## Déploiement sur machine :

1. Cloner le projet
2. Installer votre application et faire le build
2. Copier le build : `sudo cp /dist/* /var/www/html/`
3. Vérifier la conf nginx, voir 'nginx.conf' (normalement conf de base) : `sudo nano /etc/nginx/sites-enabled/default`
4. Installer certbot et installer le certificat
```sh
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
sudo certbot renew --dry-run
```
5. Restart nginx : `sudo systemctl restart nginx`