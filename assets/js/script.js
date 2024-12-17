const searchInput = document.getElementById('search-input');
const movieGrid = document.getElementById('movieGrid');

searchInput.addEventListener('input', searchMovies);

async function searchMovies() {
  const query = searchInput.value;
  if (query.length > 2) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();

    movieGrid.innerHTML = '';  // Clear previous results

    if (data.length > 0) {
      data.forEach(item => {
        const movie = item.show;
        const movieEl = document.createElement('div');
        movieEl.style.backgroundColor = '#1a1919';
        movieEl.style.padding = '20px';
        movieEl.style.borderRadius = '5px';
        movieEl.style.textAlign = 'center';
        movieEl.style.width = '30%';
        movieEl.style.marginRight = '20px';
        
        movieEl.innerHTML = `
          <img src="${movie.image ? movie.image.medium : 'assets/images/Rectangle 4.png'}" 
               alt="${movie.name}" style="width: 100%; height: auto;">
          <h3 style="margin: 10px 0; color: #fff;">${movie.name}</h3>
          <p style="color: #aaa;">Rating: ${movie.rating.average || 'N/A'}</p>
        `;
        movieGrid.appendChild(movieEl);
      });
    } else {
      movieGrid.innerHTML = '<p style="color: #fff; text-align: center;">No movies found. Try a different search.</p>';
    }
  } else {
    // If search query is too short, fetch and display random movies
    displayRandomMovies();
  }
}

// Fetch and display random 3 movies on load
window.onload = displayRandomMovies;

async function displayRandomMovies() {
  const randomMovies = ['Breaking Bad', 'Friends', 'Game of Thrones', 'Stranger Things', 'The Office'];
  movieGrid.innerHTML = ''; // Clear the grid before adding random movies

  for (let movieName of randomMovies) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${movieName}`);
    const data = await response.json();
    
    if (data.length > 0) {
      const movie = data[0].show;
      const movieEl = document.createElement('div');
      movieEl.style.backgroundColor = '#1a1919';
      movieEl.style.padding = '20px';
      movieEl.style.borderRadius = '5px';
      movieEl.style.textAlign = 'center';
      movieEl.style.width = '30%';
      movieEl.style.marginRight = '20px';
      
      movieEl.innerHTML = `
        <img src="${movie.image ? movie.image.medium : 'assets/images/Rectangle 4.png'}" 
             alt="${movie.name}" style="width: 100%; height: auto;">
        <h3 style="margin: 10px 0; color: #fff;">${movie.name}</h3>
        <p style="color: #aaa;">Rating: ${movie.rating.average || 'N/A'}</p>
      `;
      movieGrid.appendChild(movieEl);
    }
  }
}
