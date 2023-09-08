import UserModel from "../models/User"
import express, { Response } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize"
import auth from "../auth/auth"

/**
 * Defines the route for editing a user.
 */
function editUserRoute(app: express.Application) {
    /**
     * Express route for editing a user, using authentication token.
     */
    app.put('/api/editUser/:id', auth, (req: any, res: Response) => {
    const id = parseInt(req.params.id);
    const userIdFromToken = req.user?.userId;
    if (userIdFromToken !== id) {
        const message = `L'utilisateur n'est pas autorisé à modifier ce compte.`;
        return res.status(401).json({ message });
        }
    UserModel.update(req.body, {
    where: { id: id } 
    })
    .then(_ => {
        return UserModel.findByPk(id).then(user => {
        if (user === null) {
            const message = `L'utilisateur demandé n'existe plus.`;
            return res.status(404).json({ message });
        }
            const message = `L'utilisateur ${user.userName} a bien été modifié.`;
            res.json({ message, data: user });
        });
    })
    .catch(error => {
        if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
        }
        console.log("erreur", error);
        const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
    });
    });
};

export default editUserRoute;