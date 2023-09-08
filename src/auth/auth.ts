import privateKey from '../auth/private_key';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Définission d'un type personnalisé pour l'objet Request
interface CustomRequest extends Request {
    user?: { userId: string }; 
  }


//export default function authenticateToken
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

    // Ajout de req.user avec l'ID de l'utilisateur provenant du token
    //req.user = { userId: decodedToken.userId };
    //const userId = decodedToken.userId
    req.user = { userId: decodedToken.userId };
    next();

    /*if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message });
    } else {
      next();
    }*/
  });
}

export default auth;