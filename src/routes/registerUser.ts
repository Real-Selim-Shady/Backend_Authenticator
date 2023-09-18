import { Request, Response, Application } from "express";
import User from "../models/User";
import { ValidationError, UniqueConstraintError } from "sequelize";

/**
 * Defines the route for creating a new user.
 */
const registerUserRoute = (app: Application) => {
  /**
   * Express route for creating a new user.
   */
  app.post('/api/registerUser', async (req: Request, res: Response) => {
    const count = await User.count();
    const userRole = count === 0 ? 'Admin' : 'User';

    const { firstName, lastName, userName, password } = req.body;

    User.create({
      firstName,
      lastName,
      userName,
      password,
      role: userRole, 
    })
      .then(user => {
        const message = `L'utilisateur ${req.body.userName} a bien été créé ${count}.`
        res.json({ message, data: user })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  });
};

export default registerUserRoute;
