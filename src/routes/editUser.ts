import UserModel from "../models/User"
import { ValidationError, UniqueConstraintError } from "sequelize"
import authenticateToken from "../auth/auth"

module.exports = (app: any) => {
    app.put('/api/editUser/:id', authenticateToken, (req: any, res: any) => {
    const userIdFromToken = req.user.userId;
    const id = parseInt(req.params.id);
    

    // Vérification de la corresponsance entre l'ID de l'utilisateur dans le token et l'ID dans la requête
    if (userIdFromToken !== id) {
      const message = `Vous n'êtes pas autorisé à modifier ce compte.`;
      return res.status(403).json({ message });
    }
      else {
            // L'identifiant de l'utilisateur est valide, l'opération continue
            UserModel.update(req.body, {
            where: { id: id } 
            })
            .then(_ => {
                return UserModel.findByPk(id).then(user => {
                if (user === null) {
                    const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
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
        }
    });
  };

