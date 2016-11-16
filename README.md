# Nodepop
Practica Node.JS, Express, MongoDB Master Keepcoding IV

It´s an **API** that works in **iOS** and **Android**.

You can download or clone it.
Use **npm install** to download all the *node.js* dependencies.

### Init database

    npm run installDB

## Start
    
    npm start

## JSHint & JSCS

    npm run hints

## API v1 info


### Base Path

The API can be used with the path: 
[API V1](/apiv1/anuncios)

### Security

The API uses JSON Web Token to handle users. First you will need to call /usuarios/register to create a user.  

Then call /usuarios/authenticate to obtain a token.
  
Next calls will need to have the token in:  

- Header: x-access-token: eyJ0eXAiO...
- Body: { token: eyJ0eXAiO... }
- Query string: ?token=eyJ0eXAiO...

### Language

All requests that return error messages are localized to english, if you want to 
change language make the request with the header accept-language set to other language, 
i.e. Accept-Language: es 

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "Authentication failed. Wrong password."
      }
    }

### POST /users/register

**Input Body**: { nombre, email, clave}

**Result:** 

    {
      "ok": true, 
      "message": "user created!"
    }

### POST /users/authenticate

**Input Body**: { email, clave}

**Result:** 

    {
      "ok": true, 
      "token": "..."
    }

### GET /commercials

**Input Query**: 

start: {int} skip records  
limit: {int} limit to records  
sort: {string} field name to sort by  
includeTotal: {bool} whether to include the count of total records without filters  
tag: {string} tag name to filter  
venta: {bool} filter by venta or not  
precio: {range} filter by price range, examples 10-90, -90, 10-   
nombre: {string} filter names beginning with the string  

Input query example: 
?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi

**Result:** 

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "tags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }


### GET /commercials/tags

Return the list of available tags for the resource anuncios.

**Result:** 

    {
      "ok": true,
      "allowed_tags": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }

### POST /pushtokens

Save user pushtoken { pushtoken, plataforma, idusuario}

idusuario is optional.
plataforma can be 'ios' or 'android'  

**Result:** 

    {
      "ok": true,
      "created": {
        "__v": 0,
        "token": "123456",
        "usuario": "560ad58ff82387259adbf26c",
        "plataforma": "android",
        "createdAt": "2015-09-30T21:01:19.955Z",
        "_id": "560c4b648b892ca73faac308"
      }
    }
