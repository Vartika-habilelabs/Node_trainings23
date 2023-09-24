import axios from "axios";
import inquirer from "inquirer";
const Omdb_url = `http://www.omdbapi.com/?i=tt3896198&apikey=10a5e243`;

const questions = [
  {
    type: "input",
    name: "genre",
    message: "What is your preferred movie genre?",
  },
  {
    type: "input",
    name: "year",
    message: "Please tell me your preferred release year",
  },
  {
    type: "input",
    name: "actor",
    message: "Favourite actor?",
  },
];

const apiCall = (answers) => {
  axios
    .get(Omdb_url, {
      params: {
        Year: answers.year,
        Genre: answers.genre,
        Actors: answers.actor,
      },
    })
    .then((res) =>
      res.data ? console.log(res.data) : console.log("No movies found")
    )
    .catch((err) => console.log(err));
};

inquirer
  .prompt(questions)
  .then((answers) => {
    apiCall(answers);
  })
  .catch((err) => {
    console.log(err);
  });
