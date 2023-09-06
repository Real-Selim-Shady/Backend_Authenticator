
import UserModel from './src/models/User';
import { initDb, sequelize } from './src/db/sequelize';
import createServer from './src/utils/server';

const port = 3000;

const app = createServer();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

