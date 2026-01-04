import { Fragment } from "react";
import { createPortal } from "react-dom";

export default function AdminModal({
    children,
    show = false,
    maxWidth = "2xl",
    onClose = () => {},
}) {
    if (!show) return null;

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    // Menggunakan createPortal agar modal dirender di luar hierarchy DOM utama (opsional tapi disarankan)
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4">
            {/* Backdrop Click to Close */}
            <div className="fixed inset-0" onClick={onClose}></div>

            {/* Modal Content */}
            <div
                className={`bg-white rounded-2xl shadow-xl transform transition-all w-full ${maxWidthClass} overflow-hidden z-10 animate-in fade-in zoom-in duration-200`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
