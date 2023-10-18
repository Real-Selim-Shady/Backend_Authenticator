import User from "../models/User";
import { Response, Application, Request } from "express";
import {auth} from "../auth/auth";

interface AuthenticatedRequest extends Request {
    user?: {
      userId: string; 
    };
}

/**
 * Defines the route for getting user data.
 */
const findUserRoute = (app: Application) => {
	/**
     * Express route for getting user data, using authentication token.
     */
	app.get("/api/findUser/:id", auth, async (req: AuthenticatedRequest, res: Response) => {

		const userIdFromToken = req.user?.userId;
		const idFromUserToDelete = parseInt(req.params.id);
    
		const parsedIntTokenId = parseInt(userIdFromToken as string);
    
		if (isNaN(parsedIntTokenId) || parsedIntTokenId !== idFromUserToDelete) {
			const message = "L'utilisateur n'est pas autorisé à cette ressource.";
			return res.status(401).json({ message });
		}
    
		try {
			const user = await User.findByPk(parsedIntTokenId);

			if(user !== null){
				const message = "La liste des utilisateurs a bien été récupérée.";
				res.json({ message, data: user });
			}
			else{
				const message = "L'utilisateur demandé n'existe pas.";
				return res.status(404).json({ message });
			}
		} catch (error) {
			const message = "Les données de l'utilisateur n'a pas pu être récupéré pour le moment, réessayez dans quelques instants";
			res.status(500).json({ message, data: error });
		}
	});
};

export default findUserRoute;
