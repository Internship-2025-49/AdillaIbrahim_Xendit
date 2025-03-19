```
npm install
npm run dev
```

```
open http://localhost:3000
```

```
 # Invoice Management API

 ## Endpoints

 ### 1. Create a New Invoice

 * **Method**: POST
 * **Path**: `/invoices`
  * **Description**: Create a new invoice.
 * **Request Body**:
 	+ `externalId`: string (required)
 	+ `userId`: string (required)
    + `invoiceDuration`: string
 	+ `amount`: number (required)
 	+ `currency`: string (required)
    + `paymentMethods`: array (string)
 	+ `customer`: object (required)
 	+ `items`: array (required)
 	+ `fees`: object (required)
 * **Response**:
 	+ `invoiceId`: string
 	+ `externalId`: string
 	+ `userId`: string
    + `invoiceDuration`: string
 	+ `amount`: number
 	+ `currency`: string
    + `paymentMethods`: array
 	+ `customer`: object
 	+ `items`: array
 	+ `fees`: object


 ### 2. Get Invoices

 * **Method**: GET
 * **Path**: `/invoices`
  * **Description**: Retrieving all available invoices.
 * **Response**:
 	+ `invoices`: array
 		- `invoiceId`: string
 		- `externalId`: string
 		- `userId`: string
 		- `amount`: number
 		- `currency`: string
 		- `customer`: object
 		- `items`: array
 		- `fees`: object


 ### 3. Get Invoice By Id

 * **Method**: GET
 * **Path**: `/invoices/{id}`
 * **Description**: Retrieving invoice details by ID.
 * **Response**:
 	+ `invoiceId`: string
 	+ `externalId`: string
 	+ `userId`: string
 	+ `amount`: number
 	+ `currency`: string
 	+ `customer`: object
 	+ `items`: array
 	+ `fees`: object


 ### 4. Expire Invoice

 * **Method**: POST
 * **Path**: `/invoices/{id}/expire`
  * **Description**:
 * **Response**: Change the invoice status to EXPIRED.
 	+ `invoiceId`: string
 	+ `status`: string (EXPIRED)


 ### 5. Handle Payment Success

 * **Method**: GET
 * **Path**: `/invoices/{id}/success`
  * **Description**: Mark the invoice as successfully paid.
 * **Response**:
 	+ `message`: string


 ### 6. Handle Payment Failure

 * **Method**: GET
 * **Path**: `/invoices/{id}/failure`
  * **Description**: Mark the invoice as failed to pay.
 * **Response**:
 	+ `message`: string


 ## Error Handling

 * **400**: Bad Request
 * **404**: Not Found
 * **500**: Internal Server Error
```

.ENV
XENDIT_API_KEY= (API_KEY from xendit)
