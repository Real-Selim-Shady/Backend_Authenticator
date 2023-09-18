import express from 'express';
import morgan from 'morgan';
import registerUserRoute from '../routes/registerUser';
import editUserRoute from '../routes/editUser';
import deleteUserRoute from '../routes/deleteUser';
import loginRoute from '../routes/login';
import findAllUsersRoute from '../routes/findAllUsers';
import cors from 'cors';


/**
 * Creates and configures an Express server.
 */
const createServer = () => {
    const app = express();

    app
    .use(morgan('dev')) //middleware helping dev to know the exact endpoint that has been called
    .use(cors())
    .use(express.json());

    /**
     * Attach routes to the Express app.
     */
    registerUserRoute(app);
    editUserRoute(app);
    deleteUserRoute(app);
    loginRoute(app);
    findAllUsersRoute(app);

    return app
}

export default createServer;