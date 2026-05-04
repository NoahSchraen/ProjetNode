# ProjetNode # Cinema API 

projet sur l'API REST de la gestion d’un cinéma (salles, films, séances, billets, utilisateurs)

# Stack technique

* Node.js
* TypeScript
* Express
* PostgreSQL
* TypeORM
* Docker 

##  Installation des dépendances

npm install

## Lancement de la base

docker-compose up -d

# Lancement du serveur

npm run dev

# Test sur l’API avec Postman

POST : http://localhost:3000/rooms

Dans le body créer une salle : 

{
  "name": "Salle 1",
  "description": "Grande salle",
  "images": ["img1.jpg"],
  "type": "IMAX",
  "capacity": 25
}

GET : http://localhost:3000/rooms

# Auteur

Aurore - Hakim - Noah
