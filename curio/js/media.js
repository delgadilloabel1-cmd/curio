export class Media {
  constructor({
    id,
    title,
    type,
    image = "",
    synopsis = "",
    status = "planned",
    rating = null,
    notes = "",
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.image = image;
    this.synopsis = synopsis;
    this.status = status;
    this.rating = rating;
    this.notes = notes;
    this.createdAt = createdAt;
  }

  setStatus(status) {
    this.status = status;
  }

  setRating(rating) {
    this.rating = rating;
  }

  setNotes(text) {
    this.notes = text;
  }
}

export class Movie extends Media {
  constructor(data) {
    super({ ...data, type: "movie" });
    this.runtime = data.runtime || null;
    this.streaming = data.streaming || [];
  }
}

export class TVShow extends Media {
  constructor(data) {
    super({ ...data, type: "tv" });
    this.seasons = data.seasons || null;
  }
}

export class Anime extends Media {
  constructor(data) {
    super({ ...data, type: "anime" });
    this.episodes = data.episodes || null;
  }
}

export class Book extends Media {
  constructor(data) {
    super({ ...data, type: "book" });
    this.authors = data.authors || [];
    this.pageCount = data.pageCount || null;
  }
}
