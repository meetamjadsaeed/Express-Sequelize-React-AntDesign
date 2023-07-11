const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME || "assessmentdb";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT;
const dbDialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  dialectOptions: {
    options: { requestTimeout: 300000 },
  },
  // port: dbPort,
});

const db = {};
//sequelize instance to access and create db tables
db.sequelize = sequelize;

//sequelize Object to get sequelize functions
db.Sequelize = Sequelize;

module.exports = db;

