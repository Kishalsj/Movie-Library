let slideIndex = 0;

function showSlides() {
  try {
    const slideshowContainer = document.getElementById("slideshow-container");
    const slides = document.getElementsByClassName("slide");
    if (!slideshowContainer || slides.length === 0) {
      throw new Error("Slideshow container or slides not found.");
    }

    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0; 
    }
    slideshowContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    setTimeout(showSlides, 3000); 
  } catch (error) {
    console.error("Error in showSlides:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    showSlides();

    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    if (hamburger && menu) {
      hamburger.addEventListener('click', () => {
        menu.classList.toggle('visible');
      });
    } else {
      console.warn("Hamburger menu or navigation menu not found.");
    }

    const searchInput = document.getElementById('search-input');
    const movieGrid = document.getElementById('movieGrid');
    if (searchInput && movieGrid) {
      searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        if (query) {
          searchMovies(query);
        } else {
          loadRandomMovies();
        }
      });
    } else {
      console.warn("Search input or movie grid not found.");
    }
  } catch (error) {
    console.error("Error in DOMContentLoaded handler:", error.message);
  }
});

function scrollToTop() {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error("Error in scrollToTop:", error.message);
  }
}

function scrollToSection(event, sectionId) {
  try {
    event.preventDefault();
    const section = document.querySelector(sectionId);
    if (!section) {
      throw new Error(`Section with ID ${sectionId} not found.`);
    }
    section.scrollIntoView({ behavior: 'smooth' });
    setActiveLink(sectionId);
  } catch (error) {
    console.error("Error in scrollToSection:", error.message);
  }
}

function setActiveLink(sectionId) {
  try {
    const links = document.querySelectorAll('#menu a');
    links.forEach(link => {
      if (link.getAttribute('href') === sectionId) {
        link.querySelector('span').style.width = '100%';
      } else {
        link.querySelector('span').style.width = '0';
      }
    });
  } catch (error) {
    console.error("Error in setActiveLink:", error.message);
  }
}

window.addEventListener('scroll', () => {
  try {
    const sections = document.querySelectorAll('section');
    const fromTop = window.scrollY + 100;

    sections.forEach(section => {
      const link = document.querySelector(`#menu a[href="#${section.id}"]`);
      if (link) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.querySelector('span').style.width = '100%';
        } else {
          link.querySelector('span').style.width = '0';
        }
      }
    });
  } catch (error) {
    console.error("Error in scroll event handler:", error.message);
  }
});

function createMovieElement(movie) {
  try {
    const movieEl = document.createElement('div');
    movieEl.className = 'movie-card';
    movieEl.style.backgroundColor = '#3C3C3C';
    movieEl.style.padding = '10px';
    movieEl.style.borderRadius = '5px';
    movieEl.style.textAlign = 'center';

    movieEl.innerHTML = `
      <img src="${movie.image ? movie.image.medium : 'assets/images/Rectangle 4.png'}" 
           alt="${movie.name}" style="width: 100%; height: auto;">
      <h3 style="margin: 10px 0; color: #fff;">${movie.name}</h3>
      <p style="color: #aaa;">Rating: ${movie.rating?.average || 'N/A'}</p>
    `;

    return movieEl;
  } catch (error) {
    console.error("Error in createMovieElement:", error.message);
  }
}

async function searchMovies(query) {
  try {
    const movieGrid = document.getElementById('movieGrid');
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }
    const data = await response.json();
    movieGrid.innerHTML = '';

    data.forEach(item => {
      const movieEl = createMovieElement(item.show);
      movieGrid.appendChild(movieEl);
    });
  } catch (error) {
    console.error("Error in searchMovies:", error.message);
    alert("Unable to fetch movie data. Please try again later.");
  }
}

async function loadRandomMovies() {
  try {
    const randomMovies = ['Breaking Bad', 'Batman: the audio adventures', 'spiderman'];
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';

    for (let movieName of randomMovies) {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${movieName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${movieName}. Status: ${response.status}`);
      }
      const data = await response.json();
      if (data[0]) {
        const movieEl = createMovieElement(data[0].show);
        movieGrid.appendChild(movieEl);
      } else {
        console.warn(`No data found for movie: ${movieName}`);
      }
    }
  } catch (error) {
    console.error("Error in loadRandomMovies:", error.message);
    alert("Unable to load random movies. Please try again later.");
  }
}

window.onload = () => {
  try {
    loadRandomMovies();
  } catch (error) {
    console.error("Error in window.onload:", error.message);
  }
};
