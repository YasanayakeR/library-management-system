import axios from "axios";
import { Book } from "../types/Book";
import { CreateBookDTO } from "../types/CreateBookDTO";

const API_URL = "http://localhost:5186/api/books";

export const getBooks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addBook = async (book: CreateBookDTO) => {
  return await axios.post(API_URL, book);
};

export const updateBook = async (id: string, book: CreateBookDTO) => {
  return await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};