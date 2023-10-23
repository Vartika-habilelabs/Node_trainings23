const Employee = require("../Schema/model.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
  }
);
const getAll = async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM "Employees" WHERE salary > ${val} `
    );
    res.json(results);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const create = async (req, res) => {
  const { firstName, lastName, salary } = req.body;
  try {
    if (!firstName || !salary) {
      res.status(422).send("Please fill all the fields");
      return;
    }
    const existingEmployee = await Employee.findOne({
      where: {
        firstName,
        lastName,
        salary,
      },
    });

    if (existingEmployee) {
      res.status(200).send("Entry already exists");
    } else {
      await Employee.create({
        firstName,
        lastName,
        salary,
      });
      res.status(200).send("Entry created successfully");
    }
  } catch (error) {
    console.log("Error:- ", error);
  }
};
const highSalary = async (req, res) => {
  const { val } = req.params;
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM "Employees" WHERE salary > ${val} `
    );
    res.json(results);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, salary } = req.body;

  try {
    if (!firstName && !lastName && !salary) {
      res.status(400).json({ message: "Nothing to update" });
      return;
    }

    const employee = await Employee.findByPk(id);

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    if (firstName) {
      employee.firstName = firstName;
    }
    if (lastName) {
      employee.lastName = lastName;
    }
    if (salary) {
      employee.salary = salary;
    }

    await employee.save();

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAll,
  create,
  highSalary,
  update,
};
