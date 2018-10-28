# Taminion
Library that uses Axios to access CouchDb

#### Installation
1. Install `npm`
1. Run `npm install taminion`

#### Getting Started
To use Taminion you will need to connect to your CouchDb.
```js
const taminion = require('taminion');
const db = taminion('http://localhost:5984');
```
alternatively you could also use:
```js
const db = require('taminion')('http://localhost:5984');
```
