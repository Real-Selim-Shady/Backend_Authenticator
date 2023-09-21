import { Sequelize } from "sequelize-typescript";
import User from "../models/User";


/**
 * Sequelize instance used to connect to the database.
 */
const sequelize = new Sequelize({
	dialect: "postgres",
	host: "localhost",
	username: "postgres",
	password: " ",
	database: "NewDb"
});

/**
 * Initializes the database by synchronizing models and populating with mock user data.
 */
async function initDb() {
	await sequelize.sync(/*{ force: true }*/); 
	//force: true n'est pas un comportement appliqué car l'alter est par défaut à false ici

	sequelize.addModels([User]);

	console.log("La base de données a bien été initialisée !");

}



export { sequelize, initDb };
