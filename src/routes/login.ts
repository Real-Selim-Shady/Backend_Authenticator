import privateKey from "../auth/private_key";
import * as jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response, Application } from "express";

/**
 * Defines the login route for user authentication.
 */
const loginRoute = (app: Application) => {
	/**
   * Express route for user authentication.
   */
	app.post("/api/login", (req: Request, res: Response) => {
		User.findOne({ where: { userName: req.body.userName } })
			.then(user => {
				if (!user) {
					const message = "L'utilisateur demandé n'existe pas.";
					return res.status(404).json({ message });
				}

				bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
					if (!isPasswordValid) {
						const message = "Le mot de passe est incorrect.";
						return res.status(401).json({ message });
					}

					/**
           * Generates a valid JWT token valid for 24 hours.
           */
					const token = jwt.sign(
						{ userId: user.id, userRole: user.role },
						privateKey,
						{ expiresIn: "24h" }
					);

					const successMessage = "L'utilisateur a été connecté avec succès";
					return res.json({ message: successMessage, data: user, token });
				});
			})
			.catch((error: Error) => {
				const errorMessage = "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.";
				return res.status(500).json({ message: errorMessage, data: error });
			});
	});
};

export default loginRoute;