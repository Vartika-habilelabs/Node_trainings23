import readline from "readline";
import env from "dotenv";
import service from "./services/services.js";
env.config();
const rdl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const ask = () => {
  rdl.question("Recipient Email: ", (email) => {

    if (email.length===0) {
      console.log("please enter email");
      rdl.close();
    } else {
      rdl.question("Subject: ", (subject) => {
        rdl.question("Message: ", (message) => {
          service(email, subject, message);
          rdl.close();
        });
      });
    }
  });
};

ask();
