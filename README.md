# Taminium
Library that uses Axios to access CouchDb

#### Installation
1. Install `npm`
1. Run `npm install taminium`

#### Getting Started
To use Taminium you will need to connect to your CouchDb.
```js
const taminium = require('taminium');
const db = taminium('http://localhost:5984');
```
alternatively you could also use:
```js
const db = require('taminium')('http://localhost:5984');
```
