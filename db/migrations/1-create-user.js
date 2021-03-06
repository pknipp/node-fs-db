'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
      email: {allowNull: false, type: Sequelize.STRING(255), unique: true},
      hashedPassword: {allowNull: false, type: Sequelize.STRING(60).BINARY},
      ...["createdAt", "updatedAt"].reduce((pojo, key) => {
        return {...pojo, [key]: {allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW")}};
      }, {})
    });
  },
  down: queryInterface => queryInterface.dropTable('Users')
};
