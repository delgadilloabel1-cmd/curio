import { Library } from "./library.js";

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
