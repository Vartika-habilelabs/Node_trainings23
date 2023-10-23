const express = require("express");
const { connection } = require("./sequelize.js");
const app = express();
const indexRouter = require("./routes/index.js");
require("dotenv").config();
const port = process.env.PORT;
connection();
app.use(express.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
