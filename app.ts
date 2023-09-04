import express from 'express';
import UserModel from './src/models/User';
import { initDb, sequelize } from './src/db/sequelize';
import morgan from 'morgan';


const app = express();
const port = 3000;

app
  .use(morgan('dev')) //permet d'afficher l'endpoint actuel et le statut
  .use(express.json());

async function main() {
  await initDb();
  await sequelize.sync();

}

main();

app.get('/', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

require('./src/routes/findAllUsers')(app)
require('./src/routes/createUser')(app)
require('./src/routes/login')(app)
require('./src/routes/editUser')(app)
require('./src/routes/deleteUser')(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

