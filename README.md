# Introduction

Simple E-commerce API


# Technologies used 

- Nodejs
- Expressjs
- Typescript
- PostgreSQL
- db-migrate
- Jasmine 
- Bcrypt 
- JWT
- Dotenv
- Prettier
- ESlint
- Supertest


## Getting started

1. install the packages by running:

```bash
npm install
```
or 
```bash
yarn
```
2. Then connect to psql: 
- **Ubuntu**
```bash
sudo -u postgres psql
```
- **windows**
```bash
psql -U postgres
```
3. Create a user
4. Create two databases one for development and another for testing
5. There is a ".env.example" file provided please put the credentials that you made and rename it to be ".env"
6. Use db-migrate: 
```bash
db-migrate up
```
 7. Start the server: 
```bash
npm run watch
```
or 
```bash
yarn watch
```
The backend and database will be running locally on port:3000.

**Look at REQUIREMENTS.md to see the API-ROUTES and database schema.**

