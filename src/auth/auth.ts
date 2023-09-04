import privateKey from '../auth/private_key';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Définission d'un type personnalisé pour l'objet Request
interface CustomRequest extends Request {
    user?: { userId: string }; // Ajout de la propriété 'user'
  }
  
  export default function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader) {
      const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
      return res.status(401).json({ message });
    }
  
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, privateKey, (error: any, decodedToken: any) => {
      if (error) {
        const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
        return res.status(401).json({ message, data: error });
      }
  
      // Ajout de req.user avec l'ID de l'utilisateur provenant du token
      req.user = { userId: decodedToken.userId };
  
      if (req.body.userId && req.body.userId !== req.user.userId) {
        const message = `L'identifiant de l'utilisateur est invalide.`;
        return res.status(401).json({ message });
      } else {
        next();
      }
    });
  }