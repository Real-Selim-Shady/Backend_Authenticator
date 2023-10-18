import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import User from "../models/User";
import http from "http";
import loginRoute from "../routes/login";
import jwt from "jsonwebtoken";
import privateKey from "../auth/private_key";
import editUserRoute from "../routes/editUser";

const app = express();
app.use(bodyParser.json());

const token = jwt.sign(
	{ userId: "2", userRole: "User" },
	privateKey,
	{ expiresIn: "24h" }
);


// Mocking findOne, findByPk, user.save(),
jest.mock("../models/User", () => {
	const originalModule = jest.requireActual("../models/User");
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const bcrypt = require("bcrypt");
	const hashedPassword = bcrypt.hashSync("testpassword", 10);
	const mockUser = {
		id: 2,
		firstName: "testuserfirstName",
		lastName: "testuserlastName",
		userName: "testuser",
		password: hashedPassword, 
		role: "User",
		save: jest.fn()
	};

	return {
		...originalModule,
		findOne: jest.fn().mockResolvedValue(mockUser),
		findByPk: jest.fn().mockResolvedValue(mockUser), 
	};
});


describe("Login Route", () => {
	let server: http.Server;

	beforeEach(() => {
		server = app.listen(); // Port is empty, so the server will chose a free one
		loginRoute(app); // Adding tested Route
	});

	afterEach((done) => {
		server.close(done);
	});

	it("should log in a user with valid credentials", async () => {
		const response = await request(app)
			.post("/api/login")
			.send({ userName: "testuser", password: "testpassword" });

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("L'utilisateur a été connecté avec succès");
	});

	it("should handle invalid credentials", async () => {
		const response = await request(app)
			.post("/api/login")
			.send({ userName: "testuser", password: "incorrectpassword" });

		expect(response.status).toBe(401);
		expect(response.body.message).toBe("Le mot de passe est incorrect.");
	});

	it("should handle non-existent user", async () => {
		(User.findOne as jest.Mock).mockResolvedValue(null);

		const response = await request(app)
			.post("/api/login")
			.send({ userName: "nonexistentuser", password: "testpassword" });

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("L'utilisateur demandé n'existe pas.");
	});

	it("should handle server error", async () => {
		(User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

		const response = await request(app)
			.post("/api/login")
			.send({ userName: "testuser", password: "testpassword" });

		expect(response.status).toBe(500);
		expect(response.body.message).toBe("L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.");
	});
});

describe("Edit User Route", () => {

	let server: http.Server;

	beforeEach(() => {
		server = app.listen(); // Port is empty, so the server will choose a free one
		editUserRoute(app); // Adding tested Route
	});

	afterEach((done) => {
		server.close(done);
	});

	it("should edit a user with valid credentials and token", async () => {

		const requestBody = {
			firstName: "newFirstName",
			lastName: "newLastName",
			userName: "newUserName",
			password: "newPassword",
		};

		const response = await request(app)
			.put("/api/editUser/2")
			.set("Authorization", "Bearer " + token) 
			.send(requestBody);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("L'utilisateur newUserName a bien été modifié.");
	});

	it("should handle invalid token", async () => {
		const response = await request(app)
			.put("/api/editUser/2")
			.set("Authorization", "Bearer " + "222") 
			.send({ firstName: "newFirstName", lastName: "newLastName", userName: "newUserName", password: "newPassword" });

		expect(response.status).toBe(401);
		expect(response.body.message).toBe("L'utilisateur n'est pas autorisé à accéder à cette ressource.");
	});

	it("should handle non-existent user", async () => {
		const response = await request(app)
			.put("/api/editUser/3")
			.set("Authorization", "Bearer " + token) 
			.send({ firstName: "newFirstName", lastName: "newLastName", userName: "newUserName", password: "newPassword" });

		expect(response.status).toBe(401);
		expect(response.body.message).toBe("L'utilisateur n'est pas autorisé à modifier ce compte.");
	});
});
