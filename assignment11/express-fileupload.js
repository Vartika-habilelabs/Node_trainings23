const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
app.use(fileUpload());

app.get("/", (req, res) => {
  res.end(`
        <html>
        <head></head>
        <body>
        <form action="fileupload" method="POST" enctype="multipart/form-data">
            <input type="file" name="filefield"><br />
            <input type="submit">
          </form>
        </body>
        </html>
        `);
});

app.post("/fileupload", (req, res) => {
  if (req.files) {
    const file = req.files.filefield;
    const filename = file.name;
    file.mv(path.join(__dirname, "/uploads", filename), (err) => {
      if (err) res.send(err);
      else res.send("File uploaded");
    });
  }
});

app.listen(3000, (err) => {
  console.log("server is running on port 3000");
});
