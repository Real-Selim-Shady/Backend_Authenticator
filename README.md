0. `Project description`

This project allows you to play with a database of Users, using logging in, editing, deleting, creating data functionalities. 
It is based on Express, NodeJs, Typescript and PostgresSQL.


1. `Prerequisites`

- Node.js - https://nodejs.org/en/download/
- PostgresSQL - https://www.postgresql.org/download/

2. `Install project and Launch the project`

- Install backend project, available here: https://github.com/Real-Selim-Shady/Backend_Loger
- Install dependencies with command 'npm install'
- Install PostgresSql (I used version 15.3-4 during project realisation)
- Create a server named NewLocalServer
- Set hostname: 'localhost' in connection parameters
- Set password: ' ' (one spacebar) in connection parameters
- Create the DB and name it 'NewDB'
- Make sure username and password in the config.json file is corresponding your actual username and password in the connection parameters of the DB
- In project folder, use command 'npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,userName:string,password:string'
- Use command 'npx sequelize-cli db:migrate'
- Launch project using command 'npm start'
- in http://localhost:3000/, you will find existing users, provided in mock-user file available in folder db, this way : Backend_loger/src/db/mock-user.ts
- Don't add any ID, it is already provided automatically with a primary key


3. `Available Routes`

- You can find the routes in Backend_loger/src/routes folder

- Here are the routes:

findAllUsers: Get /api/findAllUser
Description: Allows retrieving the up-to-date list of users, enabling developers to test routes and check their impact on the database.
Condition(s):
Connected to the running server and the database.

createUser: Post /api/createUser
Description: Create a user.
Condition(s):
Connected to the running server and the database.
Choose a unique userName.

login: Get /api/login
Description: Allows logging in as a user.
Condition(s):
Connected to the running server and the database.
Enter valid user information (matching userName and password).

editUser: Put /api/editUser/:id
Description: Allows editing a user's information.
Condition(s):
Connected to the running server and the database.
Use an authentication token that corresponds to the user being edited.

deleteUser: Delete /api/deleteUser/:id
Description: Allows deleting a user.
Condition(s):
Connected to the running server and the database.
Use an authentication token that corresponds to the user being deleted.

4. `Launch test`

- Use command 'npm test'

5. `Try routes with a tool`

- You can test all routes by setting them in a tool such as Insomnia, available for free: https://insomnia.rest/pricing
