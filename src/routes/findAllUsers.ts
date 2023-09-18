import User from "../models/User";
import express, { Request, Response } from "express";
import { auth } from "../auth/auth";

/**
 * Defines the route for getting all users.
 */
const findAllUsersRoute = (app: express.Application) => {
  /**
   * Express route for getting all users.
   */
  app.get('/api/findAllUsers', auth, async (req: any, res: Response) => {
    const userRoleFromToken = req.user?.userRole;

    if (userRoleFromToken === 'Admin') {
      User.findAll({ order: ['firstName'] })
        .then((users: User[]) => {
          const message = 'La liste des utilisateurs a bien été récupérée.'
          res.json({ message, data: users })
        })
        .catch((error: any) => {
          const message = `La liste des utilisateurs n'a pu être récupérée pour le moment, réessayez dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    } else {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource. ${userRoleFromToken}`;
      res.status(401).json({ message });
    }
  });
}

export default findAllUsersRoute;
