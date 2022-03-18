# MyTsOrmDemo

## Intro

This is a full-stack application that demostrates how to handle data in a relational database with ORM and howto store hierarchical data in NgRx Store and manage with NgRx Data.

## Storage of data

Data persisted in relational database (PostgreSQL) in normalized format.
It's a good approach to do the same in NgRx Store. Store hierarchical data in _normalized_ form. The basic concepts of normalizing data are:
* Each type of data gets its own "table" in the state.
* Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
* Any references to individual items should be done by storing the item's ID.
* Arrays of IDs should be used to indicate ordering.

### Howto render normalized data hierarchical?

If you need normalized data in hierarchical form you can read and convert it with NgRx selectors.
 
## Build

Backend:
```
cd my-mikroorm-demo-server
npm i
```

Frontend:
```
cd my-ts-orm-demo
npm i
```

## Creating default database

