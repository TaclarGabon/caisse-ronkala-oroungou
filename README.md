# CAISSE RONKALA OROUNGOU

Application familiale de suivi des versements et des demandes de retrait.

## Devise

**Solidarité – Transparence – Avenir**

## Contenu de la version 1.0

- Tableau de bord
- Versements
- Deux modes de versement :
  - Comptoir bancaire
  - Transfert à la trésorière
- Ajout possible d’un justificatif
- Demandes de retrait
- Liste des membres
- Rôle de trésorière
- Soldes personnels
- Archives mensuelles
- Alertes simples
- Aucun graphique
- Aucune donnée bancaire sensible

## Mise en ligne avec GitHub Pages

1. Créer un nouveau dépôt GitHub.
2. Ajouter les fichiers `index.html` et `style.css` à la racine du dépôt.
3. Ouvrir **Settings**.
4. Ouvrir **Pages**.
5. Dans **Build and deployment**, choisir **Deploy from a branch**.
6. Sélectionner la branche `main` et le dossier `/root`.
7. Enregistrer.

GitHub fournira ensuite l’adresse publique du site.

## Important

Cette version est une prévisualisation statique. Les boutons n’enregistrent pas encore réellement les données.

La connexion Firebase permettra ensuite :

- la sauvegarde en ligne ;
- le partage entre les membres ;
- la gestion des rôles ;
- le stockage sécurisé des justificatifs ;
- la synchronisation en temps réel.

Ne jamais stocker dans cette application :

- un numéro de compte bancaire complet ;
- un mot de passe bancaire ;
- un code secret ;
- un identifiant de banque en ligne.
