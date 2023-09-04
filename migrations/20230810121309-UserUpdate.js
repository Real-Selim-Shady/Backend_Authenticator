'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'userName', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'userName');
    await queryInterface.removeColumn('Users', 'password');
  }
};
