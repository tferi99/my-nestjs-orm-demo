![](https://github.com/tferi99/angular-orm-demo/blob/master/angular-orm-demo/src/assets/logo.png)


# MyNestJsOrmDemo

## Intro

This is a full-stack application implemented with TypeScript that demostrates how to handle data in a relational database with ORM and howto store hierarchical data in NgRx Store and manage with NgRx Data. Repo contains two projects:
1. mikroorm-demo-server (backend)
2. angular-orm-demo (frontend)


### Technology

#### Backend:
* PostgreSQL
* NestJS
* MikroORM

#### Frontend:
* Angular
* Bootstrap
* ngx-bootstrap
* ngrx (Entity, Data)

### Features
#### Backend:
* Data managent with ORM (mikro-orm)
* JWT based authentication (passport)
* Logging (winston)
* Generics for CRUD Entity Repository
* Generics for CRUD Entity Service
* Generics for CRUD REST controllers
* Centralized error handling + sending custom error status messages about general database (unique, constrain, ...) errors 

#### Frontend:
* Reactive Forms with validation
* Modal data editor dialogs
* Auto-focus on forms
* Data storage of hierarchical data with NgRx Data
* Generics (service, components) for CRUD operations
* Drag-and-drop operations
* Modal confirm dialogs

## Storage of data

Data persisted in relational database (PostgreSQL) in normalized format.
It's a good approach to do the same in NgRx Store. Store hierarchical data in _normalized_ form. The basic concepts of normalizing data are:
* Each type of data gets its own "table" in the state.
* Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
* Any references to individual items should be done by storing the item's ID.
* Arrays of IDs should be used to indicate ordering.

### Howto render normalized data hierarchical?

If you need normalized data in hierarchical form you can read and convert it with NgRx selectors.

## Prerequisites
Installed PostreSQL server.

## Installation
Backend:
```
cd mikroorm-demo-server
npm install
```
Frontend:
```
cd angular-orm-demo
npm install
```

## Database
Create database:
```
createdb -U postgres mynestjsormdemo
```
Set database credentials in _**.env**_, for example:
```
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
```

Create database schema:
```
cd mikroorm-demo-server
npm run createdbschema
```

## Run
Backend:
```
cd mikroorm-demo-server
npm run start
```

Frontend:
```
cd angular-orm-demo
npm run start
```

Call frontend: [http://localhost:4201](http://localhost:4201)

## Test
You can test manually the backend with [Postman](https://www.postman.com/).
Import this [workspace](mikroorm-demo-server/test/postman/mikroorm-demo-server.postman_collection.json) for testing.
