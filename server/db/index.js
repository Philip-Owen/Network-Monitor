const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(
  "nms",
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgres",
    define: {
      timestamps: false,
    },
    logging: false,
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function waitForPostgres() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      sequelize.sync();
    })
    .catch((err) => {
      console.error("Unable to connect to the database, retrying...");
      waitForPostgres();
    });
}

waitForPostgres();

module.exports = db;
