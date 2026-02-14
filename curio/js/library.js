import { Movie, TVShow, Anime, Book } from "./media.js";
import { saveLibrary, loadLibrary } from "./storage.js";

export class Library {
  constructor() {
    this.items = [];
    this.load();
  }

  load() {
    const rawItems = loadLibrary();

    this.items = rawItems.map((item) => {
      return this.createMedia(item.type, item);
    });
  }

  save() {
    saveLibrary(this.items);
  }

  add(item) {
    this.items.push(item);
    this.save();
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }

  getByType(type) {
    return this.items.filter((item) => item.type === type);
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status);
  }

  findById(id) {
    return this.items.find((item) => item.id === id);
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
}
