
import UserModel from './src/models/User';
import { initDb, sequelize } from './src/db/sequelize';
import createServer from './src/utils/server';

/**
 * The port on which the Express server will listen.
 */
const port = 3000;

/**
 * Create an instance of the Express server.
 */
const app = createServer();


/**
 * Initializes the database and synchronizes Sequelize models with the database.
 */
async function main() {
  await initDb();
  await sequelize.sync();

}

main();


/**
 * Express route to retrieve a list of users.
 */
app.get('/', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * The port on which the Express server will listen for incoming requests.
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

