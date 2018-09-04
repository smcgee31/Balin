## .create(db)
Creates a new database. The database name must be composed by following next rules:

Name must begin with a lowercase letter (a-z)
Lowercase characters (a-z)
Digits (0-9)
Any of the characters `_, $, (, ), +, -, and /`

If you’re familiar with Regular Expressions, the rules above could be written as 
`^[a-z][a-z0-9_$()+/-]*$`

#### Parameters:
* db – Database name

#### Request Headers:	
* Accept
  * application/json
  * text/plain

#### Response Headers:
* Content-Type
  * application/json
  * text/plain; charset=utf-8
* Location – Database URI location

#### Response JSON Object:
* ok (boolean) – Operation status. Available in case of success
* error (string) – Error type. Available if response code is 4xx
* reason (string) – Error description. Available if response code is 4xx

#### Status Codes:
* 201 Created – Database created successfully
* 400 Bad Request – Invalid database name
* 401 Unauthorized – CouchDB Server Administrator privileges required
* 412 Precondition Failed – Database already exists

#### Examples:

**Example Request: (using standard promises)**
```js
axiouch.create('my-database').then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
})
```

**Example Request: (using async/await)**
```js
try {
  const response = await axiouch.create('my-database');
  // success - data is in 'response.data'
} catch {
  // any exception thrown from the await or error thrown from CouchDB
}
```

**Example Response: (from async/await)**
```json
{
  "status": 201,
  "statusText": "Created",
  "data": { "ok": true }
}
```

The entire response from axios is returned so all other items (headers, request, etc.) would also be part of the response object.

----------------------------------------------

## .destroy(db)
Deletes the specified database, and all the documents and attachments contained within it.

#### Parameters:	
db – Database name

#### Request Headers:
* Accept –
  * application/json
  * text/plain

#### Response Headers:
* Content-Type –
  * application/json
  * text/plain; charset=utf-8

#### Response JSON Object:
* ok (boolean) – Operation status

#### Status Codes:	
* 200 OK – Database removed successfully
* 400 Bad Request – Invalid database name or forgotten document id by accident
* 401 Unauthorized – CouchDB Server Administrator privileges required
* 404 Not Found – Database doesn’t exist

#### Examples:

**Example Request: (using standard promises)**
```js
axiouch.destroy('my-database').then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
})
```

**Example Request: (using async/await)**
```js
try {
  const response = await axiouch.destroy('my-database');
  // success - data is in 'response.data'
} catch {
  // any exception thrown from the await or error thrown from CouchDB
}
```

**Example Response: (from async/await)**
```json
{
  "status": 200,
  "statusText": "OK",
  "data": { "ok": true }
}
```

The entire response from axios is returned so all other items (headers, request, etc.) would also be part of the response object.
