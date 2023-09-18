import User from "../models/User";
import { auth } from "../auth/auth";
import { Response, Application, Request } from "express";


interface AuthenticatedRequest extends Request {
  user?: {
    userId: string; 
  };
}


/**
 * Defines the route for deleting a user.
 */
const deleteUserRoute = (app: Application) => {
	/**
   * Express route for deleting a user, using authentication token.
   */
	app.delete("/api/deleteUser/:id", auth, async (req: AuthenticatedRequest, res: Response) => {

		const userIdFromToken = req.user?.userId;
		const idFromUserToDelete = parseInt(req.params.id);

		if (userIdFromToken === undefined) {
			const message = "L'utilisateur n'est pas autorisé à modifier ce compte.";
			return res.status(401).json({ message });
		}

		const parsedIntTokenId = parseInt(userIdFromToken);

		if (isNaN(parsedIntTokenId) || parsedIntTokenId !== idFromUserToDelete) {
			const message = "L'utilisateur n'est pas autorisé à modifier ce compte.";
			return res.status(401).json({ message });
		}

		try {
			const user = await User.findByPk(parsedIntTokenId);

			if (user === null) {
				const message = "L'utilisateur demandé n'existe pas. Réessayez un autre identifiant";
				return res.status(404).json({ message });
			}

			if (user.role === "Admin") {
				const message = "Un administrateur ne peut pas être supprimé.";
				return res.status(403).json({ message });
			}

			const userDeleted = user;

			await User.destroy({
				where: { id: user?.id }
			});

			const message = `L'utilisateur ${userDeleted?.userName} a bien été supprimé.`;
			res.json({ message, data: userDeleted });
		} catch (error) {
			const message = "L'utilisateur n'a pas pu être supprimé pour le moment, réessayez dans quelques instants";
			res.status(500).json({ message, data: error });
		}
	});
};

export default deleteUserRoute;
