# Projet cinéma

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- JWT
- Joi
- Docker

# Liste des fonctionnalités implémentées :

## Authentification

- création de compte
- connexion
- déconnexion
- JWT
- protection des routes
- rôles :
  - CLIENT
  - ADMIN
  - SUPER_ADMIN

## Gestion des salles

- CRUD salles
- maintenance des salles
- validation capacité :
  - minimum 15 places
  - maximum 30 places
- planning des salles
- génération automatique des salles avec seed

## Gestion des films

- CRUD films
- consultation des films
- planning des films
- génération automatique des films avec seed

## Gestion des séances

- CRUD séances
- consultation des séances
- planning global des séances
- relation :
  - film
  - salle
  - séance
- anti chevauchement des séances
- blocage des séances dans une salle en maintenance
- durée minimum :
  durée du film + 30 minutes
- génération automatique des séances avec seed

## Gestion des tickets

- achat de billets
- billets simples
- super billets
- consultation des billets utilisateur
- validation des billets
- tickets utilisés = spectateurs présents
- génération automatique des tickets avec seed

## Gestion argent / wallet

- consultation du solde
- dépôt argent
- retrait argent
- historique transactions

# Installation

Installation des dépendances :

npm install

Lancement de MySQL avec Docker :

docker compose up database

Lancement du serveur :

npm run dev

Résultat attendu :

Serveur lancé sur http://localhost:3000

# Seeds automatiques

Au lancement du serveur :

- création automatique des salles
- création automatique des films
- création automatique des séances
- création automatique des tickets

# Routes auth

POST /auth/register

Body :

{
  "email": "youyou@test.fr",
  "password": "password123"
}

POST /auth/login

Body :

{
  "email": "aurore@test.fr",
  "password": "password123"
}

POST /auth/logout

# Routes salles

Toutes les routes vers /rooms demandent un token.

GET /rooms

GET /rooms/1

POST /rooms

Body :

{
  "name": "Salle Rouge",
  "description": "Grande salle confortable",
  "images": "",
  "type": "IMAX",
  "capacity": 20,
  "handicapAccess": true
}

PUT /rooms/1

Body :

{
  "name": "Salle Bleue",
  "capacity": 25
}

DELETE /rooms/1

PATCH /rooms/1/maintenance

Body :

{
  "inMaintenance": true
}

GET /rooms/1/schedule?from=2026-06-01&to=2026-06-30

# Routes films

Toutes les routes vers /movies demandent un token.

GET /movies

GET /movies/1

POST /movies

Body :

{
  "title": "Avengers",
  "description": "Film Marvel",
  "duration": 180,
  "genre": "Action",
  "image": ""
}

PUT /movies/1

DELETE /movies/1

GET /movies/1/schedule?from=2026-06-01&to=2026-06-30

# Routes séances

Toutes les routes vers /sessions demandent un token.

GET /sessions

POST /sessions

Body :

{
  "movieId": 1,
  "roomId": 1,
  "startTime": "2026-06-10T18:00:00",
  "endTime": "2026-06-10T21:30:00"
}

PUT /sessions/1

DELETE /sessions/1

GET /sessions/schedule?from=2026-06-01&to=2026-06-30

# Routes tickets

Toutes les routes vers /tickets demandent un token.

POST /tickets/buy

Body :

{
  "sessionId": 1,
  "type": "SIMPLE"
}

GET /tickets/my

POST /tickets/1/use

# Routes wallet

Toutes les routes vers /wallet demandent un token.

GET /wallet

POST /wallet/deposit

Body :

{
  "amount": 100
}

POST /wallet/withdraw

Body :

{
  "amount": 50
}

GET /wallet/transactions/my

# Point clé à noter

- Pour créer, modifier ou supprimer :
  - salles
  - films
  - séances

  il faut être ADMIN ou SUPER_ADMIN

- Par défaut un nouvel utilisateur est CLIENT

- Pour tester rapidement les routes admin, on peut modifier son rôle directement dans MySQL

- Une salle en maintenance ne peut pas recevoir de séance

- Une séance doit durer :
  durée du film + 30 minutes

- Les séances ne peuvent pas se chevaucher

- Les tickets utilisés représentent les spectateurs présents