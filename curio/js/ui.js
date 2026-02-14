export function renderLibrary(items) {
  const container = document.getElementById("library");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No media yet.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "media-card";
    card.innerHTML = `
        ${item.image ? `<img src="${item.image}" alt="${item.title}" />` : ""}
        <h3>${item.title}</h3>
        <div class="media-meta">
         <span>${item.type.toUpperCase()}</span> •
            <span>${item.status}</span>
        </div>
        ${item.rating ? `<div>⭐ ${item.rating}/5</div>` : ""}
`;

    card.addEventListener("click", () => {
      showMediaModal(item);
    });

    container.appendChild(card);
  });
}

export function showMediaModal(item) {
  const modal = document.getElementById("media-modal");
  const poster = document.getElementById("modal-poster");

  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-type").textContent = item.type.toUpperCase();
  document.getElementById("modal-year").textContent = item.year || "—";
  document.getElementById("modal-status").textContent =
    item.status || "Planned";
  document.getElementById("modal-rating").textContent = item.rating
    ? `⭐ ${item.rating}/5`
    : "Not rated";
  document.getElementById("modal-notes").textContent =
    item.synopsis || "No synopsis available.";

  if (item.image) {
    poster.src = item.image;
    poster.style.display = "block";
  } else {
    poster.style.display = "none";
  }

  modal.classList.remove("hidden");
}

export function hideMediaModal() {
  document.getElementById("media-modal").classList.add("hidden");
}

export function renderSearchResults(results, onSelect) {
  const container = document.getElementById("search-results");
  container.innerHTML = "";

  results.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "media-card";

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    card.innerHTML = `
  ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" />` : ""}
  <h3>${movie.title}</h3>
  <div class="media-meta">
    ${movie.release_date?.slice(0, 4) || "Unknown"}
  </div>
`;

    card.addEventListener("click", () => onSelect(movie));
    container.appendChild(card);
  });
}
