import axios from "axios";
import { Category } from "../types/Category";

const API_URL = "http://localhost:5186/api/categories";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};