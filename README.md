# WinbackTSG

Application de support technique et de dépannage pour les produits Winback.

## 📋 Description

WinbackTSG est une application web React moderne qui fournit des informations de dépannage et de support technique pour les produits Winback. Elle permet aux utilisateurs de consulter facilement la documentation technique et les guides de dépannage.

## 🚀 Fonctionnalités

- Interface utilisateur intuitive et réactive
- Système de filtrage pour trouver rapidement les informations
- Support de documentation technique détaillée
- Compatible avec les appareils mobiles et de bureau

## 📥 Prérequis

- Node.js (version ≥ 16)
- npm (généralement inclus avec Node.js)

## ⚙️ Installation

1. Clonez le dépôt :
```bash
git clone [git@github.com:sergeimlk/TSG-V01.git]
cd TSG-V01
```

2. Installez les dépendances :
```bash
npm install
```
<!-- 
3. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires (contactez l'administrateur pour obtenir les valeurs) :
```
REACT_APP_API_URL=votre_url_api -->
```

## 🔧 Développement

Pour lancer l'application en mode développement :
```bash
npm start
```
L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## 🏗️ Production

Pour créer une version de production :
```bash
npm run build
```

## 🔄 Convertisseur de Documentation

### Instructions pour la conversion Word vers JSON

1. Téléchargez le fichier "WordJsonConverter.xlsm"
2. Ouvrez-le avec Excel
3. Configuration :
   - Cellule B2 : Chemin du dossier source (fichiers Word)
   - Cellule B3 : Chemin du dossier de destination (fichiers JSON)
4. Cliquez sur "Générer les fichiers JSON"
5. Copiez les fichiers générés dans `src/Shared/Ressources`

## 🛠️ Technologies Utilisées

- React 18
- FontAwesome pour les icônes
- Framer Motion pour les animations
- Keycloak pour l'authentification

## 📝 Versioning

Version actuelle : 0.3.1

## 👥 Auteurs

- Winback

## 📄 Licence

Ce projet est privé et propriétaire. © Winback
