# axiouch
Library that uses Axios to access CouchDb

#### Installation
1. Install `npm`
1. Run `npm install axiouch`

#### Getting Started
To use Axiouch you will need to connect to your CouchDb.
```js
const axiouch = require('axiouch');
const db = axiouch('http://localhost:5984');
```
alternatively you could also use:
```js
const db = require('axiouch')('http://localhost:5984');
```
