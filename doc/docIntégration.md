# Documentation d'intégration

Comment lancer l'api

## en local

avec une base de donnée mysql ou [mariadb](https://www.mariadbtutorial.com/getting-started/install-mariadb/), créer vos identifiants et renseigner les dans le fichier de [configuration](../config/config.json), sequelize se charge de créer les entitées en base.

lancer ensuite l'api avec les commandes suivante :

```bash
$ npm i
$ npm start
```

l'api tourne en localhost sur le port spécifié dans le fichier [src/index.js](../src/index.js)

## en production

il est fortement conseillé d'utiliser [pm2](https://pm2.keymetrics.io/) pour faire tourner son api en fond de votre vps. comme pour la version locale, créer sur votre vps votre base de donnée et indiquez les logs dans le fichier config.json

une [github Action](../.github/workflows/node.js.yml) tourne si vous pusher sur la branche main pour s'occuper du déploiement, installer simplement un runner sur votre serveur.
