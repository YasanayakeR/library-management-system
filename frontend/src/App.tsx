import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
