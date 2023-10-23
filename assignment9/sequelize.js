const Sequelize = require("sequelize");
// const usermodel = require("./Schema/model");
require('dotenv').config();
const connection = async () => {
  const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
    host: "localhost",
    dialect: "postgres",
  });
//  let User=null
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // User=usermodel(sequelize);
    // await sequelize.sync();
    // console.log("table created");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports={
    connection
}