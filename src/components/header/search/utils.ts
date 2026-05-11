export const getSavedSearch = () => localStorage.getItem("search_term") ?? "";

export const saveSearch = (value: string) =>
  localStorage.setItem("search_term", value);
