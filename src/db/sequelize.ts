import { Sequelize } from 'sequelize-typescript';
import { AutoIncrement } from 'sequelize-typescript';
import UserModel from '../models/User';
import users from './mock-users';
import bcrypt from 'bcrypt';

/**
 * Sequelize instance used to connect to the database.
 */
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: ' ',
  database: 'NewDb'
});

/**
 * Initializes the database by synchronizing models and populating with mock user data.
 */
async function initDb() {
  await sequelize.sync({ force: true });

  /**
   * Connects the UserModel and mock users, sending them to the database.
   */
  for (const user of users) {
    await UserModel.create(user);
  }

  console.log('La base de données a bien été initialisée !');

}

sequelize.addModels([UserModel]);

export { sequelize, initDb };
