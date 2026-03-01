import { Book } from "../types/Book";

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}



export default function BookCardList({ books, onEdit, onDelete }: Props) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
        <p className="text-lg text-slate-500">No books found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

      {books.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-xl shadow-lg border border-slate-200/50 
          hover:-translate-y-1 hover:shadow-xl transition-all duration-300
          flex flex-col min-h-[22rem] overflow-hidden"
        >

          {/* Book Card */}
          <div className="h-14 bg-theme-accent opacity-90"></div>

          <div className="flex flex-col flex-grow bg-white pt-6 pb-6 px-6 text-center">

            <div className="flex-grow flex flex-col items-center">
              <h2 className="text-lg font-bold text-theme-primary leading-tight mb-2 min-h-[3.5rem] flex items-center justify-center p-2 text-center" title={b.title}>
                {b.title}
              </h2>

              <p className="text-sm font-bold text-theme-text opacity-70 uppercase tracking-widest mb-4">
                By {b.author}
              </p>

              <div className="flex-grow w-full px-4 mb-4">
                <p className="text-sm text-theme-text opacity-70 leading-relaxed text-left break-words">
                  {b.description || "No description available."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4">
              <button
                onClick={() => onEdit(b)}
                className="flex-1 bg-white text-theme-primary hover:bg-theme-primary hover:text-white border border-theme-primary/20 hover:border-transparent 
                font-semibold px-4 py-2 text-sm rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                Edit
              </button>

              <button
                onClick={() => b.id && onDelete(b.id)}
                className="flex-1 bg-theme-danger/5 text-theme-danger hover:bg-theme-danger hover:text-white border border-theme-danger/20 hover:border-transparent
                font-semibold px-4 py-2 text-sm rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}