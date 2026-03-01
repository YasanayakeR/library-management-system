import { useState, useEffect } from "react";
import { updateBook } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { Book } from "../types/Book";
import { Category } from "../types/Category";
import { toast } from "react-toastify";

interface Props {
  book: Book;
  books: Book[];
  onClose: () => void;
  refresh: () => void;
}

export default function EditBook({ book, books, onClose, refresh }: Props) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description || "");
  const [categoryId, setCategoryId] = useState(book.categoryId);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async () => {
    if (!book.id) return;

    if (!title.trim() || !author.trim() || !categoryId) {
      toast.warn("Please fill in all required fields (Title, Author, and Category).");
      return;
    }

    const isDuplicate = books.some(
      (b) =>
        b.id !== book.id &&
        b.title.toLowerCase().trim() === title.toLowerCase().trim() &&
        b.author.toLowerCase().trim() === author.toLowerCase().trim()
    );

    if (isDuplicate) {
      toast.error("Another book with this title and author already exists!");
      return;
    }

    await updateBook(book.id, { title, author, description, categoryId });
    toast.success("Book updated successfully!");
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl transform transition-all">
        <h2 className="text-2xl font-bold text-theme-primary mb-6">Edit Book</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Title</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:border-theme-secondary transition-shadow text-theme-text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Author</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:border-theme-secondary transition-shadow text-theme-text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Description</label>
            <textarea
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:border-theme-secondary transition-shadow text-theme-text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-text mb-1">Category</label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-theme-secondary focus:border-theme-secondary transition-shadow bg-white text-theme-text"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}>
              {categories.map(c => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={handleSubmit}
            className="flex-1 bg-theme-primary hover:bg-theme-primary/95 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            Update Book
          </button>

          <button onClick={onClose}
            className="flex-1 bg-white hover:bg-theme-background text-theme-primary border border-theme-primary/10 font-medium px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}