## .insert(data)
Either: 
creates a new named document (doc `id` is included),
creates a new unnamed document (doc `id` is not included), 
creates a new revision (updates) the existing document (doc `id` and `rev` are included).

#### Parameters:	
* data – Object containing the data to be saved as a document.
  * _id – Document ID. If included the new document will be named with this id.
  * _rev – Document revision MVCC token. If included with the _id then the document will be updated.

#### Request Headers:
* Accept –
  * application/json
  * text/plain
* Content-Type – application/json
* If-Match – Document’s revision. Alternative to `rev` query parameter
* X-Couch-Full-Commit – Overrides server’s commit policy. Possible values are: `false` and `true`. _Optional_

#### Response Headers:
* Content-Type –
  * application/json
  * text/plain; charset=utf-8
* ETag – Quoted document’s new revision
* Location – Document URI

#### Response JSON Object:
* id (string) – Document ID
* ok (boolean) – Operation status
* rev (string) – Revision MVCC token

#### Status Codes:	
* 201 Created – Document created and stored on disk
* 202 Accepted – Document data accepted, but not yet stored on disk
* 400 Bad Request – Invalid request body or parameters
* 401 Unauthorized – Write privileges required
* 404 Not Found – Specified database or document ID doesn’t exists
* 409 Conflict – Document with the specified ID already exists or specified revision is not latest for target document

#### Examples:

Given the following object:
```js
const data = {
  title: 'Short Circuit',
  character: 'Johnny5',
  favoriteLine: 'Johnny5 is alive!',
};
```

**Example Request: (using standard promises)**
```js
myDatabase.insert(data).then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
})
```

**Example Request: (using async/await)**
```js
try {
  const response = myDatabase.insert(data);
  // success - data is in 'response.data'
} catch(err) {
  // failure - error information is in 'err'
}
```

**Example Response**
```json
{ 
  "status": 201,
  "statusText": "Created",
  "data": {
    "ok": true,
    "id": "54d42ec6713843e5e019747888015da0",
    "rev": "1-d3b8510594ce37effacb3758adf04571"
  }
}
```

----------------------------------------------

## .get(id, [query])
Returns document by the specified doc `id`. Unless you request a specific revision, the latest revision of the document will always be returned.

#### Parameters:
* id – Document ID
* query - Object containing the query parameters.  _Optional_

#### Request Headers:
* Accept –
  * application/json
  * multipart/mixed
  * text/plain
* If-None-Match – Double quoted document’s revision token

#### Query Parameters:
Key|Type|Description
---|----|-----------
**attachments**|boolean|Includes attachments bodies in response. Default is false
**att_encoding_info**|boolean|Includes encoding information in attachment stubs if the particular attachment is compressed. Default is false.
**atts_since**|array|Includes attachments only since specified revisions. Doesn’t includes attachments for specified revisions. _Optional_
**conflicts**|boolean|Includes information about conflicts in document. Default is false
**deleted_conflicts**|boolean|Includes information about deleted conflicted revisions. Default is false
**latest**|boolean|Forces retrieving latest “leaf” revision, no matter what rev was requested. Default is false
**local_seq**|boolean|Includes last update sequence number for the document. Default is false
**meta**|boolean|Acts same as specifying all conflicts, deleted_conflicts and open_revs query parameters. Default is false
**open_revs**|array|Retrieves documents of specified leaf revisions. Additionally, it accepts value as all to return all leaf revisions. _Optional_
**rev**|string|Retrieves document of specified revision. _Optional_
**revs**|boolean|Includes list of all known document revisions. Default is false
**revs_info**|boolean|Includes detailed information for all known document revisions. Default is false

#### Response Headers:
* Content-Type –
  * application/json
  * multipart/mixed
  * text/plain; charset=utf-8
* ETag – Double quoted document’s revision token. Not available when retrieving conflicts-related information
* Transfer-Encoding – chunked. Available if requested with query parameter open_revs

#### Response JSON Object:
* **_id** (string) – Document ID
* **_rev** (string) – Revision MVCC token
* **_deleted** (boolean) – Deletion flag. Available if document was removed
* **_attachments** (object) – Attachment’s stubs. Available if document has any attachments
* **_conflicts** (array) – List of conflicted revisions. Available if requested with conflicts=true query parameter
* **_deleted_conflicts** (array) – List of deleted conflicted revisions. Available if requested with deleted_conflicts=true query parameter
* **_local_seq** (number) – Document’s sequence number in current database. Available if requested with local_seq=true query parameter
* **_revs_info** (array) – List of objects with information about local revisions and their status. Available if requested with open_revs query parameter
* **_revisions** (object) – List of local revision tokens without. Available if requested with revs=true query parameter

#### Status Codes:	
* 200 OK – Request completed successfully
* 304 Not Modified – Document wasn’t modified since specified revision
* 400 Bad Request – The format of the request or revision was invalid
* 401 Unauthorized – Read privilege required
* 404 Not Found – Document not found

#### Examples:

**Example Request: (using standard promises)**
```js
myDatabase.get(id).then((response) => {
  // success - data is in 'response.data'
}).catch((err) => {
  // failure - error information is in 'err'
})
```

**Example Request: (using async/await)**
```js
const id = '54d42ec6713843e5e019747888011b69';
try {
  const response = await myDatabase.get(id);
  // the 'response.data' object is represented in the example below.
} catch(err) {
  // any exception thrown from the await or error thrown from CouchDB
}
```

**Example Response:**
```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "_id": "54d42ec6713843e5e019747888014a1a",
    "_rev": "1-d3b8510594ce37effacb3758adf04571",
    "movie": "Short Circuit",
    "character": "Johnny5",
    "favoriteLine": "Johnny5 is alive!"
  }
}
```

The entire response from axios is returned so all other items (headers, request, etc.) would also be part of the response object.
