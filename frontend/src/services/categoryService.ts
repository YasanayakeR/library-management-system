import axios from "axios";
import { Category } from "../types/Category";

const API_URL = "http://localhost:5186/api/categories";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.accessToken ? { Authorization: `Bearer ${user.accessToken}` } : {};
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(API_URL, { headers: getAuthHeader() });
  return res.data;
};