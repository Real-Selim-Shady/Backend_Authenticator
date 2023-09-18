/*// sequelizeMock.ts

import { Sequelize } from 'sequelize-typescript';

// Création d'un mock de la classe Sequelize
export const sequelizeMock = {
    define: jest.fn(), // Mock de la méthode define
    sync: jest.fn(),   // Mock de la méthode sync
    authenticate: jest.fn(), // Mock de la méthode authenticate
    close: jest.fn(), // Mock de la méthode close
    // Ajout d'une implémentation pour create()
    create: jest.fn().mockImplementation((user) => {
    return Promise.resolve(user);
    }),
} as unknown as Sequelize;*/