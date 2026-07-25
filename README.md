# CAISSE RONKALA OROUNGOU — V3

## Pages
- `index.html` : version réelle, vide au départ.
- `demo.html` : version de démonstration.

## Connexion
Cliquez sur la photo d’un membre puis saisissez le code initial : `1234`.

## Fonctionnalités
- 9 profils avec les vraies photos
- versements et retraits
- vote anonyme, une voix par membre
- majorité automatique à 5 voix
- paiement confirmé par Nelly après acceptation
- export Excel `.xlsx`
- sauvegarde JSON
- réinitialisation avec confirmation

## Limite actuelle
Les données restent sur le navigateur utilisé. Firebase sera nécessaire pour une vraie connexion sécurisée et une synchronisation entre tous les téléphones.

## Publication GitHub
Téléversez tous les fichiers et le dossier `assets` à la racine du dépôt, puis attendez le redéploiement de GitHub Pages.


## Correctif V3.1
Les photos sont intégrées directement dans `app.js`. Il ne faut plus téléverser de dossier `assets`. Remplacez simplement `index.html`, `demo.html`, `style.css`, `app.js` et `README.md`.


## V3.2
- Photo d’Oroungou Yvette (maman) en haut à droite de l’écran de connexion.
- Les neuf profils restent en dessous.
- Photo intégrée directement aux pages HTML.

## Version V4.2
Ordre des membres corrigé selon le droit d’aînesse : Georges, Edan, Davy, Éric, Franck, Nelly, Julio, Malvina, Calvin.


## Nouveautés V4.2 finale
- Vue d’ensemble familiale affichée dès le tableau de bord.
- Total versé par membre visible immédiatement.
- Statuts harmonisés : « Connecté » et « Se connecter ».
- Cotisation mensuelle minimale obligatoire de 5 000 FCFA.
- Refus automatique de tout versement inférieur à 5 000 FCFA.
- Seuil de sécurité de 500 000 FCFA avant toute demande de prêt.
- Nouveau motif « Prêt » dans les demandes.
- Onglet « Conditions / Règlement ».
- Plafond maximal du prêt signalé comme règle encore en discussion.
