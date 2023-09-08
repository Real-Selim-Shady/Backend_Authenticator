import UserModel from "../models/User"
import auth from "../auth/auth"
import express, { Response } from "express";

/**
 * Defines the route for deleting a user.
 */
function deleteUserRoute(app: express.Application){
  /**
   * Express route for deleting a user, using authentication token.
   */
  app.delete('/api/deleteUser/:id', auth, (req: any, res: Response) => {

    const userIdFromToken = req.user?.userId;
    const idFromUserToDelete = parseInt(req.params.id);

    const parsedIntTokenId = parseInt(userIdFromToken);

    if (userIdFromToken !== idFromUserToDelete) {
        const message = `L'utilisateur n'est pas autorisé à modifier ce compte.`;
        return res.status(401).json({ message });
      }

    UserModel.findByPk(idFromUserToDelete).then(user => {
    if(user === null){
        const message = `L'utilisateur demandé n'existe pas. Réessayez un autre identifiant`
        res.status(404).json({message})
        return 
    }
    const userDeleted = user;
    return UserModel.destroy({
        where: { id: user?.id }
    })
    .then(_ => {
        const message = `L'utilisateur ${userDeleted?.userName} a bien été supprimé.`
        res.json({message, data: userDeleted })
    })
    })
    .catch((error)=>{
    const message = `l'utilisateur n'a pas pu être supprimé pour le moment, réessayez dans quelques instants`;
    res.status(500).json({message, data: error});
    })
  })
};

export default deleteUserRoute;
