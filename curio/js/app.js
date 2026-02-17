import { Library } from "./library.js";
import {
  renderLibrary,
  hideMediaModal,
  renderSearchResults,
  showMediaModal,
  renderListSidebar,
  renderListDropdown,
} from "./ui.js";
import { searchMovies, getMovieDetails } from "./api.js";

let selectedApiItem = null;

const library = new Library();
let activeListName = "Watchlist";

/* -------------------------
   DEMO DATA 
-------------------------- */
if (library.getList("Watchlist").length === 0) {
  const demo = library.createMedia("movie", {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    synopsis: "Two imprisoned men bond over a number of years.",
    type: "movie",
    status: "completed",
  });

  demo.setRating(5);
  demo.setNotes("All-time favorite.");

  library.addToList("Watchlist", demo);
}

/* -------------------------
   LIBRARY VIEW RENDER
-------------------------- */
function updateLibraryView() {
  const items = library.getList(activeListName);
  renderLibrary(items);
  console.log(
    "Rendering list:",
    activeListName,
    library.getList(activeListName),
  );

  const listNames = library.getListNames();

  renderListSidebar(listNames, activeListName, (name) => {
    activeListName = name;
    updateLibraryView();
  });

  renderListDropdown(listNames, activeListName, (name) => {
    activeListName = name;
    updateLibraryView();
  });
}

updateLibraryView();

/* -------------------------
   MODAL CONTROLS
-------------------------- */
document
  .getElementById("close-modal")
  .addEventListener("click", hideMediaModal);

document.getElementById("media-modal").addEventListener("click", (e) => {
  if (e.target.id === "media-modal") hideMediaModal();
});

/* -------------------------
   SEARCH
-------------------------- */
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return;

  try {
    const results = await searchMovies(query);

    renderSearchResults(results, async (movie) => {
      const details = await getMovieDetails(movie.id);
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

/* -------------------------
   ADD TO LIBRARY
-------------------------- */
document.getElementById("add-to-library-btn").addEventListener("click", () => {
  if (!selectedApiItem) return;

  const movie = library.createMedia("movie", {
    id: selectedApiItem.id,
    title: selectedApiItem.title,
    synopsis: selectedApiItem.overview,
    image: selectedApiItem.poster_path
      ? `https://image.tmdb.org/t/p/w500${selectedApiItem.poster_path}`
      : "",
    type: "movie",
    status: "planned",
  });

  library.addToList(activeListName, movie);
  updateLibraryView();
  hideMediaModal();
});

/* -------------------------
   TABS
-------------------------- */
const discoverView = document.getElementById("discover-view");
const libraryView = document.getElementById("library-view");

const discoverTab = document.getElementById("tab-discover");
const libraryTab = document.getElementById("tab-library");

libraryTab.addEventListener("click", () => {
  activeListName = activeListName || "Watchlist"; // 🔑 force valid list

  libraryView.classList.remove("hidden");
  discoverView.classList.add("hidden");

  libraryTab.classList.add("active");
  discoverTab.classList.remove("active");

  updateLibraryView();
});

// libraryTab.addEventListener("click", () => {
//   libraryView.classList.remove("hidden");
//   discoverView.classList.add("hidden");
//   libraryTab.classList.add("active");
//   discoverTab.classList.remove("active");
//   updateLibraryView();
// });
