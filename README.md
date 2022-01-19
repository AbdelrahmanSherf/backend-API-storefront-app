# Storefront Backend Project

## Getting Started
This is a storefront API that uses RESTful Api Architecture. This API can make use of its database to handle users ordering products by an online store. 

## Technologies Stack
- TypeScript
- NodeJs
- PostgreSQL
- NodeJS
- Jasmine

## libraries Stack
- Postgres 
- Express 
- dotenv for managing environment variables
- db-migrate for migrations
- jsonwebtoken for working with JWTs
- jasmine/supertest for testing
- BCRYPT/SALT for passowrd hashing

## Project Structure
```
migrations
    sqls
        products-table-down.sql
        products-table-up.sql
        users-table-down.sql
        users-table-up.sql
        orders-table-down.sql
        orders-table-up.sql
        order-details-table-down.sql
        order-details-table-up.sql
    order-details-table.js
    products-table.js
    orders-table.js
    users-table.js
spec
    support
        jasmine.json
src
    modles
        userModel.ts
        productModel.ts
        orderModel.ts
        orderDetailsModel.ts
    handlers
        userHandler.ts
        productHandler.ts
        orderHandler.ts
        orderDetailsHandler.ts
    middleware
        verifyAuthToken.ts
    tests
        helpers
            reporter.ts
        modles
            userModelSpec.ts
            productModelSpec.ts
            orderModelSpec.ts
            orderDetailsModelSpec.ts
        handlers
            userHandlerSpec.ts
            productHandlerSpec.ts
            orderHandlerSpec.ts
            orderDetailsHandlerSpec.ts
    database.ts
    server.ts
node_modules
pachage.json
package-lock.json
tsconfig.json
.env
database.json
README.md 
LICENSE.txt
REQUIREMENTS.md
```

## Initializing The project
- Install all Modules with `npm i`
- Setup a `dev` and `test` databases
- Create an environment variables file, the schema for the .env file is: 
    ``` 
        POSTGRES_HOST     =     < db host HERE >
        POSTGRES_USER     =     < db user name HERE >
        POSTGRES_PASSWORD =     < db user password HERE >
        POSTGRES_DB       =     < db name HERE >
        POSTGRES_DB_TEST  =     < testing db name HERE >
        BCRYPT_SECRET     =     < Bcrypt passowrd HERE >
        SALT_ROUNDS       =     < Salt Rounds number HERE >
        TOKEN_SECRET      =     < Token Secret Key HERE > 
        ENV               = dev < * Default Environment 
                                    is dev DO NOT CHANGE * >
    ```

- Server is running on `Host: localhost` and `Port: 5050`
- Database is working on `Host: 127.0.0.1` and `Port: 5432`
- Run `db-migrate up` to build all the tables
- Start the app with `npm run start`
- Start tests with `npm run test`

## For More Information About Application's Endpoints and Database Schema Go to REQUIREMENTS file
[REQUIREMENTS](REQUIREMENTS.md)

## License
[License](LICENSE.txt)

#### Happy Coding { <3 } <br> Built with ❤️ and Patience by [Abdelrahmans Mostafa](https://github.com/AbdelrahmanSherf)