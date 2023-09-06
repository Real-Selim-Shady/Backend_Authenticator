import UserModel from "../models/User"
import { ValidationError, UniqueConstraintError } from "sequelize"
import authenticateToken from "../auth/auth"
  
function deleteUserRoute(app: any){
  app.delete('/api/deleteUser/:id', authenticateToken, (req: any, res: any) => {

    const userIdFromToken = req.user.userId;
    const idFromUserToDelete = parseInt(req.params.id);
    if (!isNaN(userIdFromToken) && !isNaN(idFromUserToDelete) && userIdFromToken === idFromUserToDelete) {
        UserModel.findByPk(idFromUserToDelete).then(user => {
        if(user === null){
            const message = `L'utilisateur demandé n'existe pas. Réessayez un autre identifiant`
            res.status(404).json({message})
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
    } else {
        const message = `L'identifiant de l'utilisateur est invalide.`;
        res.status(401).json({ message });
    }
  })
};

export default deleteUserRoute;
