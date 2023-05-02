# NestJS base RestAPI

This project is a Rest API boilerplate with user entity, email and password authentication with JWT. In this example we are using Postgres and TypeORM.

To make it running, we just need to clone it and change somethings.

## 1. Change the database (optional)

If you want to change the database, just remove the `pg` dependency by running the command:

`npm uninstall pg`

After that, add the desirable database driver supported by TypeORM

Example: `npm install mysql`

## 2. Create a .env file

On the root directory, create a .env file and add these variables:

- DATABASE_TYPE - Database you want to use (e.g., postgres, mysql, mariadb)
- DATABASE_HOST - Database host (e.g., localhost)
- DATABASE_PORT - Database port (e.g., 5432, 3306)
- DATABASE_USERNAME - Database username (e.g., testUser)
- DATABASE_PASSWORD - Database password (e.g., testPassword)
- DATABASE_NAME - Database name (e.g., test-database)
- JWT_SECRET - JWT secret (e.g., superhardsecret)
- JWT_TTL - JWT expiration time in seconds, with the letter 's' in the end (e.g., 86400s)

## 3. Run the project

After configuring the .env file, we just need to run the project:

`npm run start` or `npm run start:dev`

If you want to run the unit tests, use the command: `npm run test`
