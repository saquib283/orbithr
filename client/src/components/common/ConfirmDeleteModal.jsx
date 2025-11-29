import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, loading }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            { }
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            { }
            <div className="relative w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                        <AlertTriangle className="text-red-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Delete Employee?</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Are you sure you want to remove this record? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all font-bold flex items-center gap-2"
                        >
                            {loading ? 'Deleting...' : <><Trash2 size={18} /> Delete</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}