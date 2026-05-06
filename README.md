# Projet cinéma 

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- JWT
- Joi

# Installation

inatallation des dependances : 

npm install

Lancement de MySQL avec Docker :

docker compose up database

Lancement du serveur :

npm run dev

Résultat attendu :

Serveur lancé sur http://localhost:3000

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

Toutes les routes vers /rooms demandent un token

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

# Point clé à noter

- Pour créer, modifier, supprimer ou mettre une salle en maintenance, il faut être ADMIN ou SUPER_ADMIN
- Par défaut un nouvel utilisateur est CLIENT
- Pour tester rapidement les routes admin, on peut modifier son rôle directement dans MySQL
