import { Movie, TVShow, Anime, Book } from "./media.js";
import { loadLibrary, saveLibrary } from "./storage.js";

export class Library {
  constructor() {
    this.lists = this.load() || {
      Watchlist: [],
      "Movies Watched": [],
      "TV Shows to Watch": [],
      "Anime Catch-Up": [],
      TBR: [],
    };
  }

  load() {
    const raw = loadLibrary();
    if (!raw) return null;

    const lists = {};

    for (const [listName, items] of Object.entries(raw)) {
      lists[listName] = items.map((item) => this.createMedia(item.type, item));
    }

    return lists;
  }

  save() {
    saveLibrary(this.lists);
  }

  addToList(listName, item) {
    if (!this.lists[listName]) return;

    if (this.lists[listName].some((i) => i.id === item.id)) return;

    this.lists[listName].push(item);
    this.save();
  }

  removeFromList(listName, id) {
    if (!this.lists[listName]) return;

    this.lists[listName] = this.lists[listName].filter(
      (item) => item.id !== id,
    );
    this.save();
  }

  moveItem(id, fromList, toList) {
    if (!this.lists[fromList] || !this.lists[toList]) return;

    const item = this.lists[fromList].find((i) => i.id === id);
    if (!item) return;

    this.lists[fromList] = this.lists[fromList].filter((i) => i.id !== id);
    this.lists[toList].push(item);
    this.save();
  }

  getList(listName) {
    return this.lists[listName] || [];
  }

  getListNames() {
    return Object.keys(this.lists);
  }

  findById(id) {
    for (const list of Object.values(this.lists)) {
      const found = list.find((item) => item.id === id);
      if (found) return found;
    }
    return null;
  }

  createMedia(type, data) {
    switch (type) {
      case "movie":
        return new Movie(data);
      case "tv":
        return new TVShow(data);
      case "anime":
        return new Anime(data);
      case "book":
        return new Book(data);
      default:
        throw new Error("Unknown media type");
    }
  }

  hasItem(id) {
    return Object.values(this.lists)
      .flat()
      .some((item) => item.id === id);
  }
}
