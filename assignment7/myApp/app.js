var createError = require("http-errors");
var express = require("express");
var path = require("path");
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
const getBooksRouter = require("./routes/getBooks");
const connectDB = require("./db/connect");
const app = express();
const moviesRouter = require("./routes/movies");
const bodyParser = require('body-parser');
// view engine setup

connectDB()
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// app.use(logger('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);
// app.get("/movies/search",(req,res)=>{
//   console.log("hhas");
//   res.send("Hi");
// })
app.use("/movies", moviesRouter);
app.use("/api/v1/book", getBooksRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
