import express from 'express';
import morgan from 'morgan';
import createUserRoute from '../routes/createUser';
import editUserRoute from '../routes/editUser';
import deleteUserRoute from '../routes/deleteUser';
import loginRoute from '../routes/login';
import findAllUsersRoute from '../routes/findAllUsers';

function createServer (){
    const app = express();

    app
    .use(morgan('dev')) //permet d'afficher l'endpoint actuel et le statut
    .use(express.json());

    createUserRoute(app);
    editUserRoute(app);
    deleteUserRoute(app);
    loginRoute(app);
    findAllUsersRoute(app);

    return app
}

export default createServer;