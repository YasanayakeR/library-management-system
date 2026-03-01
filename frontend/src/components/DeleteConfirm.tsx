import React from "react";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirm = ({ onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-xl transform transition-all text-center">

        <div className="w-16 h-16 bg-theme-danger/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-theme-danger">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-theme-primary mb-2">
          Delete Book
        </h2>

        <p className="text-theme-text opacity-70 mb-8 text-sm leading-relaxed">
          Are you sure you want to delete this book? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white hover:bg-theme-background text-theme-primary border border-theme-primary/10 font-medium px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-theme-danger hover:bg-theme-danger/95 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;