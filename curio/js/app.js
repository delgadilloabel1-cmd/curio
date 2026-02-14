import { Library } from "./library.js";
import { renderLibrary, hideMediaModal } from "./ui.js";
import { searchMovies, getMovieDetails } from "./api.js";
import { renderSearchResults, showMediaModal } from "./ui.js";

let selectedApiItem = null;

const library = new Library();

if (library.items.length === 0) {
  const demo = library.createMedia("movie", {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    synopsis: "Two imprisoned men bond over a number of years.",
  });

  demo.setStatus("completed");
  demo.setRating(5);
  demo.setNotes("All-time favorite.");

  library.add(demo);
}

console.log("Library loaded:", library.items);

renderLibrary(library.items);

// Filter buttons
document.getElementById("controls").addEventListener("click", (e) => {
  if (!e.target.dataset.type) return;

  const type = e.target.dataset.type;

  if (type === "all") {
    renderLibrary(library.items);
  } else {
    renderLibrary(library.getByType(type));
  }
});

document
  .getElementById("close-modal")
  .addEventListener("click", hideMediaModal);

document.getElementById("media-modal").addEventListener("click", (e) => {
  if (e.target.id === "media-modal") {
    hideMediaModal();
  }
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return;

  try {
    const results = await searchMovies(query);
    renderSearchResults(results, async (movie) => {
      const details = await getMovieDetails(movie.id);
      selectedApiItem = details;
      selectedApiItem = details;

      showMediaModal({
        title: details.title,
        type: "movie",
        synopsis: details.overview,
        year: details.release_date?.slice(0, 4),
        image: details.poster_path
          ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
          : "",
      });
    });
  } catch (err) {
    console.error(err);
  }
});

document.getElementById("add-to-library-btn").addEventListener("click", () => {
  if (!selectedApiItem) return;

  const movie = library.createMedia("movie", {
    id: selectedApiItem.id,
    title: selectedApiItem.title,
    synopsis: selectedApiItem.overview,
    image: selectedApiItem.poster_path
      ? `https://image.tmdb.org/t/p/w500${selectedApiItem.poster_path}`
      : "",
  });

  if (library.hasItem(selectedApiItem.id)) {
    alert("This item is already in your library.");
    return;
  }

  library.add(movie);
  renderLibrary(library.items);
  hideMediaModal();
});
