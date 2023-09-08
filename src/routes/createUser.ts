import express, { Request, Response } from "express";
import UserModel from "../models/User";
import { ValidationError, UniqueConstraintError } from "sequelize";


/**
 * Defines the route for creating a new user.
 */
function createUserRoute(app: express.Application){
    /**
     * Express route for creating a new user.
     */
    app.post('/api/createUser', (req: Request,res: Response) => {

            UserModel.create(req.body)
            .then(user => {
                const message = `L'utilisateur ${req.body.userName} a bien été créé.`
                res.json({ message, data: user })
            })
            .catch(error => {
                if(error instanceof ValidationError) {
                  return res.status(400).json({ message: error.message, data: error });
                }
                if(error instanceof UniqueConstraintError) {
                  return res.status(400).json({ message: error.message, data: error });
                }
                const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
              })

        }

    )
};

export default createUserRoute;