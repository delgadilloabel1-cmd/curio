const STORAGE_KEY = "curio-library";

export function saveLibrary(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function loadLibrary() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
