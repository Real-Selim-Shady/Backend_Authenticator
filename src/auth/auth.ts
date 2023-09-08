import privateKey from '../auth/private_key';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * CustomRequest interface extending Express Request to include user data.
 */
interface CustomRequest extends Request {
    user?: { userId: string }; 
  }

/**
 * Middleware for authenticating requests using JSON Web Tokens (JWT).
 */
function auth(req: CustomRequest, res: Response, next: NextFunction){
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, privateKey, (error: any, decodedToken: any) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message, data: error });
    }

    req.user = { userId: decodedToken.userId };
    next();
  });
}

export default auth;