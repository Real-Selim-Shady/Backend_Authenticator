import UserModel from "../models/User";
  
function findAllUsersRoute(app: any){
  app.get('/api/findAllUsers', /*auth,*/ (req: any, res: any) => {
    UserModel.findAll({order: ['firstName']})
      .then((users: UserModel[]) => {
        const message = 'La liste des utilisateurs a bien été récupérée.'
        res.json({ message, data: users })
        //comportement par défaut = à res.status(200).json({message, data: users})
      })
      .catch((error: any)=>{
        const message = `la liste des utilisateurs n'a pu être récupérée pour le moment, réessayez dans quelques instants`;
        res.status(500).json({message, data: error});

     })

  })
}

export default findAllUsersRoute;