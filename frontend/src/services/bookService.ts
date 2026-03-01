import axios from "axios";
import { CreateBookDTO } from "../types/CreateBookDTO";

const API_URL = "http://localhost:5186/api/books";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.accessToken ? { Authorization: `Bearer ${user.accessToken}` } : {};
};

export const getBooks = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeader() });
  return res.data;
};

export const addBook = async (book: CreateBookDTO) => {
  return await axios.post(API_URL, book, { headers: getAuthHeader() });
};

export const updateBook = async (id: string, book: CreateBookDTO) => {
  return await axios.put(`${API_URL}/${id}`, book, { headers: getAuthHeader() });
};

export const deleteBook = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};