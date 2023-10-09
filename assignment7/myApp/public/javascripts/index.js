const Omdb_url = `http://www.omdbapi.com/?apikey=10a5e243`;
const btn = document.querySelector('.searchbtn');
const handleClick = async () => {
  const searchValue = document.getElementById('searchInput').value;
  const divElement = document.querySelector('.result');

  if (divElement.childElementCount > 0) {
    while(divElement.children.length)
    divElement.removeChild(divElement.children[0]);
  }

  const listDiv = document.createElement('div');
  listDiv.classList.add('list');

  try {
    const res = await axios.get(Omdb_url, {
      params: {
        s: searchValue,
      },
    });

    if (res.data.Search) {
      const movies = res.data.Search;

      if (movies.length) {
        for (let movie of movies) {
          const newDiv = document.createElement('div');
          const h2 = document.createElement('h2');
          h2.textContent = movie.Title;
          const btn = document.createElement('button');
          btn.textContent = "Get Details";

          btn.addEventListener('click', () => {
            const detailDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = movie.Poster;
            const title = document.createElement('h3');
            title.textContent = `Title: ${movie.Title}`;
            const year = document.createElement('h3');
            year.textContent = `Released year: ${movie.Year}`;
            const imdbID = document.createElement('h3');
            imdbID.textContent = `IMDb ID: ${movie.imdbID}`;

            detailDiv.appendChild(img);
            detailDiv.appendChild(title);
            detailDiv.appendChild(year);
            detailDiv.appendChild(imdbID);

            if (divElement.childElementCount > 1) {
              divElement.removeChild(divElement.children[1]);
            }
            divElement.appendChild(detailDiv);
          });

          newDiv.appendChild(h2);
          newDiv.appendChild(btn);
          listDiv.appendChild(newDiv);
        }
      } else {
        const h2 = document.createElement('h2');
        h2.textContent = "No movies found";
        listDiv.appendChild(h2);
      }
    } else {
      const h2 = document.createElement('h2');
      h2.textContent = "Enter a valid movie name";
      listDiv.appendChild(h2);
    }

    divElement.appendChild(listDiv);
  } catch (err) {
    console.log(err);
  }
};
if(btn)
btn.addEventListener('click', handleClick);

/////////////////////////////////////////////////////////////////  For home page

const homebtn=document.querySelector('.homebtn')
console.log("hi");
if(homebtn)
homebtn.addEventListener('click', ()=>{
  console.log("hi");
 window.location.href=`http://localhost:${port}/movies`
})