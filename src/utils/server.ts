import express from 'express';
import morgan from 'morgan';
import createUserRoute from '../routes/createUser';
import editUserRoute from '../routes/editUser';
import deleteUserRoute from '../routes/deleteUser';
import loginRoute from '../routes/login';
import findAllUsersRoute from '../routes/findAllUsers';


/**
 * Creates and configures an Express server.
 */
function createServer (){
    const app = express();

    app
    .use(morgan('dev')) 
    .use(express.json());

    /**
     * Attach routes to the Express app.
     */
    createUserRoute(app);
    editUserRoute(app);
    deleteUserRoute(app);
    loginRoute(app);
    findAllUsersRoute(app);

    return app
}

export default createServer;