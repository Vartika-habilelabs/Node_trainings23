const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "postgres",
  });
const Employee = sequelize.define(
  "Employee",
  {
    id:{
     type:DataTypes.INTEGER,
     allowNull:false,
     primaryKey:true,
     autoIncrement:true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
  },
  {}
);
(async () => {
    await sequelize.sync();
    console.log("done")
  })();

  module.exports=Employee
// const User = sequelize.model("Users", UserSchema);
// module.exports = User;

// const usermodel = (sequelize) => {
//   return sequelize.define("user", {
//     firstName: {
//       type: DataTypes.TEXT,
//     },
//     LastName: {
//       type: DataTypes.TEXT,
//     },
//   });
// };
// module.exports=usermodel
