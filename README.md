# Axiouch
A small library that uses Axios to access CouchDb, because sometimes you just don't need Nano. seriously.

#### Installation
1. Install `npm`
1. Run `npm install -S axiouch`

#### API
[Database Methods](https://github.com/smcgee31/axiouch/blob/master/docs/Databases.md)
[Document Methods](https://github.com/smcgee31/axiouch/blob/master/docs/Documents.md)

#### Getting Started
To use `axiouch` you will need to connect to CouchDB:
```js
const axiouch = require('axiouch')('http://localhost:5984');
```

If you need to supply auth credentials the url may contain those eg.
`http://username:password@localhost:5984`

You can now use `axiouch` to create a new database:

```js
const response = await axiouch.create('my-database');
// returns { "ok": true }
```
Set `axiouch` to use that new database:
```js
const myDatabase = axiouch.use('my-database');
```

If you already have a database to use you can chain `.use` to the original `require`:
```js
const myDatabase = require('axiouch')('http://localhost:5984').use('my-database');
```

With your new database you can then add a document:
```js
const doc = {
  movie: 'Short Circuit',
  character: 'Johnny5',
  favoriteLine: 'Johnny5 is alive!',
}

const response = await myDatabase.insert(doc);
// returns: { "ok": true }
```
These examples all show the use of `async/await` and while we all love this new style you may have to use standard promises in your project. Here is a small and complete example of using standard promises:
```js
var axiouch = require('axiouch')('http://localhost:5984');
var myDatabase;

axiouch.create('my-database').then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
});

myDatabase = axiouch.use('my-database');
var doc = {
  movie: 'Short Circuit',
  character: 'Johnny5',
  favoriteLine: 'Johnny5 is alive!',
}

myDatabase.insert(doc).then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
})
```

If you have CouchDB currently running you can go to [futon](http://localhost:5984/_utils) and see your database and documents.

---
