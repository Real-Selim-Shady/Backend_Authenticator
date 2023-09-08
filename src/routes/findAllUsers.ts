import UserModel from "../models/User";
import express, { Request, Response } from "express";
  
function findAllUsersRoute(app: express.Application){
  app.get('/api/findAllUsers', (req: Request, res: Response) => {
    UserModel.findAll({order: ['firstName']})
      .then((users: UserModel[]) => {
        const message = 'La liste des utilisateurs a bien été récupérée.'
        res.json({ message, data: users })
      })
      .catch((error: any)=>{
        const message = `la liste des utilisateurs n'a pu être récupérée pour le moment, réessayez dans quelques instants`;
        res.status(500).json({message, data: error});

     })

  })
}

export default findAllUsersRoute;