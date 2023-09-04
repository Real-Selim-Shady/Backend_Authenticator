import { Sequelize } from 'sequelize-typescript';
import { AutoIncrement } from 'sequelize-typescript';
import UserModel from '../models/User';
import users from './mock-users';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: ' ',
  database: 'NewDb'
});

async function initDb() {
  await sequelize.sync({ force: true });


  //Ici, je connecte UserModel et le mock-users, que j'envoie dans la DB 
  for (const user of users) {
    await UserModel.create(user);
  }

  console.log('La base de données a bien été initialisée !');

}

sequelize.addModels([UserModel]);

export { sequelize, initDb };
