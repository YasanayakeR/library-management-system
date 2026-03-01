import React from "react";

interface LogoutConfirmProps {
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-amber-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-2">Ready to Leave?</h3>
                    <p className="text-slate-500 font-medium mb-8">
                        Are you sure you want to log out of your account?
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-4 bg-theme-primary text-white font-bold rounded-2xl shadow-lg shadow-theme-primary/20 hover:brightness-110 transition-all active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirm;
