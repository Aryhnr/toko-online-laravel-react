import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function AdminModal({
    show = false,
    title = "",
    children,
    footer = null,
    maxWidth = "2xl",
    fullScreen = false,
    onClose = () => {},
}) {
    if (!show) return null;

    const maxWidthClass = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "4xl": "max-w-4xl",
        "6xl": "max-w-6xl",
        full: "max-w-full",
    }[maxWidth];

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal */}
            <div
                className={`
                    relative z-10 w-full bg-white
                    ${maxWidthClass}
                    ${fullScreen ? "h-full rounded-none" : "max-h-[90vh] rounded-3xl"}
                    flex flex-col
                    shadow-2xl shadow-black/10
                `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* DIVIDER */}
                <div className="h-px bg-gray-100" />

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5 text-gray-700">
                    {children}
                </div>

                {/* FOOTER */}
                {footer && (
                    <>
                        <div className="h-px bg-gray-100" />
                        <div className="px-6 py-4 bg-gray-50/60 rounded-b-3xl">
                            {footer}
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
