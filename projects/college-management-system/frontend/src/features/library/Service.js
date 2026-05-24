import axios from "axios";
import { getApiConfig } from "../../utils/APIUtil";

export function fetchBooks() {
  return axios.get("http://localhost:9000/library/books", getApiConfig());
}

export function requestBook(bookId) {
  return axios.post("http://localhost:9000/library-requests", { bookId }, getApiConfig());
}

export function fetchMyRequests() {
  return axios.get("http://localhost:9000/library-requests/me", getApiConfig());
}

