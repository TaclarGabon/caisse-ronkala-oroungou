# CAISSE RONKALA OROUNGOU — V4.3.4

Correctif de déploiement et de validation de la trésorière.

- `index.html` contient maintenant directement le CSS et le JavaScript : GitHub Pages ne peut plus charger un ancien `app.js` resté en cache.
- Les versements en attente sont conservés dans la même base locale que la V4.3.3.
- En se déconnectant d’Edan puis en se connectant à Nelly sur le même navigateur, la demande apparaît dans **Validation trésorière**.
- Le numéro visible dans la barre latérale doit afficher **Version réelle V4.3.4**.

Pour GitHub, remplacer au minimum `index.html`. Les autres fichiers sont laissés dans l’archive par compatibilité.
