## 0. `Project description`

This project allows you to play with a database of Users, using logging in, editing, deleting, creating data functionalities. 
It is based on Express, NodeJs, Typescript and PostgresSQL.


## 1. `Prerequisites`

- Node.js - https://nodejs.org/en/download/
- PostgresSQL - https://www.postgresql.org/download/
- PgAdmin 4 (or another DataBase tool)

## 2. `Install project and Launch the project`

- Install backend project, available here: https://github.com/Real-Selim-Shady/Backend_Logger
- Install dependencies with command 'npm install'
- Install PostgresSql (I used version 15.3-4 during project realisation)
- Open PgAdmin 4 (or another DataBase tool)
- Create a server group named NewLocalServer by clicking right on "servers", then chose "create" and "server group"
- Go in connection parameters, by clicking right on NewLocalServer, choosing "properties", then click on connection tab:
    - In connection parameters, set hostname: 'localhost' 
    - In connection parameters, set password: ' ' (one spacebar) 
- Open the "NewLocalServer" group, you will see "Databases"
- Click right on "Databases", then "create", and "database"
- Name the Database "NewDb"
- In project folder, generate an empty migration using the npx command : "npx sequelize-cli migration:generate --name create-users-table"
- After a migration file has been generated in migrations folder, copy "fileForMigation" content and paste it in the migration file after erasing old content
- Use command 'npx sequelize-cli db:migrate'
- Make sure username and password in the config.json (inside config folder) file is corresponding your actual username and password in the connection parameters of the DB

## 3. `Launch the Project`

- Make sure your database is activated
- If it's not and you need help: 
    - Click on the arrow at the left of your server group, named here NewLocalServer
    - Wright password (here, a space bar)
    - Click on the arrow at the left of your database, named here NewDb
    - Now, it the database should be activated
- Launch project using command 'npm start'
- in http://localhost:3000/, you will see the message: "l'application est en marche"

## 4. `Important to keep in mind`

- The first registered User will automatically have the role "Admin", and all others will automatically have the role "User"
- Only the Admin will be able to use the route findAllUsers
- Admin account can not be deleted
- Don't add any ID while creating a user, it is already provided automatically with a primary key
- Don't add any role while creating a user, it is already provided automatically with a primary key

## 5. `Available Routes`

- You can find the routes in Backend_logger/src/routes folder

- Here are the routes:

    - findAllUsers: Get /api/findAllUsers
        - Description: Allows retrieving the up-to-date list of users, enabling developers to test routes and check their impact on the database.
        - Condition(s):
        - Connected to the running server and the database.
        - Connected on Admin account, providing Admin token

    - registerUser: Post /api/registerUser
        - Description: Create a user.
        - Condition(s):
        - Connected to the running server and the database.
        - Choose a unique userName.

    - login: Get /api/login
        - Description: Allows logging in as a user.
        - Condition(s):
        - Connected to the running server and the database.
        - Enter valid user information (matching userName and password).

    - editUser: Put /api/editUser/:id
        - Description: Allows editing a user's information.
        - Condition(s):
        - Connected to the running server and the database.
        - Use an authentication token that corresponds to the user being edited.

    - deleteUser: Delete /api/deleteUser/:id
        - Description: Allows deleting a user.
        - Condition(s):
        - Connected to the running server and the database.
        - Use an authentication token that corresponds to the user being deleted.

## 6. `Launch test`

Use command 'npm test'
> feature will be provided again in next updates

## 7. `Try routes with a tool`

You can test all routes by setting them in a tool such as Insomnia, available for free: https://insomnia.rest/pricing
