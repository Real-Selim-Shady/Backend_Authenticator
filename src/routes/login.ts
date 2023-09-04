import privateKey from '../auth/private_key';
import * as jwt from 'jsonwebtoken';
//const jwt = require('jsonwebtoken');
import UserModel from '../models/User';
import bcrypt from 'bcrypt';

module.exports = (app: any) => {
    app.post('/api/login', (req: any, res: any) => {
      UserModel.findOne({ where: { userName: req.body.userName } })
        .then(user => {
          if (!user) {
            const message = `L'utilisateur demandé n'existe pas.`;
            return res.status(404).json({ message });
          }
  
          bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
  
            // Générer un jeton JWT valide pendant 24 heures.
            const token = jwt.sign(
              { userId: user.id },
              privateKey,
              { expiresIn: '24h' }
            );
  
            const successMessage = `L'utilisateur a été connecté avec succès`;
            return res.json({ message: successMessage, data: user, token });
          });
        })
        .catch(error => {
          const errorMessage = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
          return res.status(500).json({ message: errorMessage, data: error });
        });
    });
  };
