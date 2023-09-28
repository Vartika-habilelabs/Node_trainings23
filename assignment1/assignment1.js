import inquirer from "inquirer";
import apiCall from "./services/apiCall.js";
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter the movie title",
  },
  {
    type: "input",
    name: "year",
    message: "Please tell me your preferred release year",
  },
];

const ask = async () => {
  try {
    const answers = await inquirer.prompt(questions);
    apiCall(answers);
  } catch {
    console.error();
  }
};
ask();
