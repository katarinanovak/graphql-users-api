# graphql-users-api
GraphQL API za upravljanje korisnicima. Projekat razvijen kao deo zadatka za junior developera.

## 📋 Opis projekta

API omogućava:
- Registraciju novih korisnika
- Dohvatanje liste svih korisnika
- Filter po imenu ili email-u
- Brisanje korisnika
- Validaciju email adrese

## 🛠 Tehnologije korišćene u projektu

- **Node.js** - JavaScript runtime
- **Apollo Server Express** - GraphQL server
- **GraphQL** - API jezik
- **MongoDB** - baza podataka
- **Mongoose** - ODM za MongoDB
- **Yarn** - package manager

## 📁 Struktura projekta
    graphql-users-api/
    ├── config/
    │ └── db.js # MongoDB konekcija
    ├── models/
    │ └── User.js # MongoDB model za korisnika
    ├── schema/
    │ ├── typeDefs.js # GraphQL šema
    │ └── resolvers.js # Resolveri (logika)
    ├── .env # Environment varijable
    ├── index.js # Glavni server fajl
    ├── package.json
    ├── yarn.lock
    ├── queries.graphql # Spremljeni GraphQL upiti
    └── README.md

text

## 🚀 Uputstvo za pokretanje projekta

### Preduslovi

- Node.js (v18 ili noviji)
- MongoDB (instaliran i pokrenut)
- Yarn package manager

### Koraci za pokretanje

1. **Kloniraj repozitorijum**
   ```bash
   git clone https://github.com/katarinanovak/graphql-users-api.git
   cd graphql-users-api
Instaliraj dependency-je

bash
yarn install
Kreiraj .env fajl u root folderu

text
MONGO_URI=mongodb://127.0.0.1:27017/users-api
PORT=4000
Pokreni server

bash
yarn node index.js
Otvori GraphQL playground

text
http://localhost:4000/graphql


🔍 Korišćenje API-ja
Dohvatanje svih korisnika
graphql
query {
  users {
    id
    name
    email
    createdAt
  }
}

Dodavanje novog korisnika
graphql
mutation {
  addUser(name: "Pera Peric", email: "pera@email.com") {
    id
    name
    email
  }
}

Filter po imenu
graphql
query {
  users(filter: { name: "Pera" }) {
    id
    name
    email
  }
}

Filter po emailu
graphql
query {
  users(filter: { email: "pera@email.com" }) {
    id
    name
    email
  }
}

Dohvatanje jednog korisnika po ID
graphql
query {
  user(id: "ID_KORISNIKA") {
    id
    name
    email
    createdAt
  }
}

Brisanje korisnika
graphql
mutation {
  deleteUser(id: "ID_KORISNIKA")
}

Dodatne funkcionalnosti
✅ Validacija email formata pri registraciji

✅ Jedinstvena email adresa (ne mogu dva ista email-a)

✅ Case-insensitive pretraga po imenu ili emailu

✅ Brisanje korisnika

✅ Timestamps (createdAt)

✅ Custom error poruke