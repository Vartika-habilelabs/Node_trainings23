import axios from "axios";
const Omdb_url = `http://www.omdbapi.com/?apikey=10a5e243`;

const apiCall = async (answers) => {
  try {
    const res = await axios.get(Omdb_url, {
      params: {
        s: answers.title,
        y: answers.year,
      },
    });

    if (res.data.Search) {
      const movies = res.data.Search.map((data) => {
        return data.Title;
      });
      if (movies.length) {
        for (let movie of movies) {
          console.log(movie);
        }
      } else {
        console.log("No movies found");
      }
    } else {
      console.log("No response from the API");
    }
  } catch (err) {
    console.log(err);
  }
};

export default apiCall;
