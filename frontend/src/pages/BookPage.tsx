import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { Book } from "../types/Book";
import { Category } from "../types/Category";
import logo from "../assets/logo.png";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBook";
import EditBookModal from "../components/EditBook";
import DeleteConfirm from "../components/DeleteConfirm";
import { toast } from "react-toastify";

export default function BooksPage() {

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const BOOKS_PER_PAGE = 8;

  const loadData = async () => {
    try {
      const [booksData, categoriesData] = await Promise.all([
        getBooks(),
        getCategories()
      ]);
      setBooks(booksData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteBookId) {
      await deleteBook(deleteBookId);
      toast.success("Book deleted successfully!");
      setDeleteBookId(null);
      loadData();
    }
  };

  // Filter books based on selected category and search 
  const filteredBooks = books.filter(b => {
    const matchesCategory = selectedCategory === "All" || b.categoryId === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
  const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen bg-theme-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-theme-primary p-2.5 rounded-2xl shadow-lg shadow-theme-primary/10">
              <img src={logo} alt="ShelfWise Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-theme-primary tracking-tight leading-none mb-1">
                ShelfWise
              </h1>
              <p className="text-xs font-bold text-theme-primary opacity-40 uppercase tracking-[0.2em]">
                Library Management System
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-theme-primary hover:bg-theme-primary/95 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Book
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-theme-primary/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-theme-primary/5 rounded-2xl focus:border-theme-primary/20 focus:ring-0 transition-all duration-300 shadow-sm text-theme-text placeholder:text-theme-text/30 font-medium"
          />
        </div>

        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xs font-bold text-theme-primary opacity-50 uppercase tracking-[0.2em] mb-4">
              Explore Collections
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 hover:-translate-y-0.5 ${selectedCategory === "All"
                  ? "bg-theme-primary text-white border-theme-primary shadow-lg shadow-theme-primary/20"
                  : "bg-white text-theme-primary hover:bg-theme-background border-theme-primary/10 hover:border-theme-primary/20"
                  }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => handleCategoryChange(cat.categoryId)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 hover:-translate-y-0.5 ${selectedCategory === cat.categoryId
                    ? "bg-theme-primary text-white border-theme-primary shadow-lg shadow-theme-primary/20"
                    : "bg-white text-theme-primary hover:bg-theme-background border-theme-primary/10 hover:border-theme-primary/20"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <BookCard
          books={currentBooks}
          onEdit={setEditBook}
          onDelete={setDeleteBookId}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pb-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${currentPage === 1
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-theme-primary/10 text-theme-primary hover:bg-theme-primary hover:text-white hover:-translate-x-1"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${currentPage === pageNum
                    ? "bg-theme-primary text-white border-theme-primary shadow-lg shadow-theme-primary/20 scale-110"
                    : "bg-white text-theme-primary border-theme-primary/10 hover:border-theme-primary/20"
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl border-2 transition-all duration-300 ${currentPage === totalPages
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-theme-primary/10 text-theme-primary hover:bg-theme-primary hover:text-white hover:translate-x-1"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}


        {showAdd &&
          <AddBookModal
            books={books}
            onClose={() => setShowAdd(false)}
            refresh={loadData}
          />
        }

        {editBook &&
          <EditBookModal
            book={editBook}
            books={books}
            onClose={() => setEditBook(null)}
            refresh={loadData}
          />
        }

        {deleteBookId &&
          <DeleteConfirm
            onClose={() => setDeleteBookId(null)}
            onConfirm={handleDeleteConfirm}
          />
        }
      </div>
    </div>
  );
}