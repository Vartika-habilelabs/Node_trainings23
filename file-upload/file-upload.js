const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath =  path.join(__dirname,  sampleFile.name);
  console.log(uploadPath);
  

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(3000, ()=> {
	console.log("console here ....... ")
})

// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = express();

// app.use(fileUpload({
//   useTempFiles: false
// }));

// app.post('/upload', function(req, res) {
//   let sampleFile;
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   sampleFile = req.files.sampleFile;
//   res.send('File uploaded!');
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

