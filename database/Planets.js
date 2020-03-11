const { connection, Sequelize } = require("./database");

const Planets = connection.define("planets", {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  value: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  unit: {
    type: Sequelize.STRING,
    allowNull: false
  },

  error_max: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },

  error_min: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },

  bibcode: {
    type: Sequelize.STRING,
    allowNull: true
  }

});

Planets.sync({ force: false });

module.exports = Planets; 