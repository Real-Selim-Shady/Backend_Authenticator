import privateKey from '../auth/private_key';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

/**
 * CustomRequest interface extending Express Request to include user data.
 */
interface CustomRequest extends Request {
    user?: { userId: string, userRole: string }; 
}

/**
 * Middleware for authenticating requests using JSON Web Tokens (JWT).
 */
const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decodedToken: JwtPayload = jwt.verify(token, privateKey) as JwtPayload; 
    req.user = { 
      userId: decodedToken.userId,
      userRole: decodedToken.userRole
    };
    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
    return res.status(401).json({ message, data: error });
  }
}

export { auth };