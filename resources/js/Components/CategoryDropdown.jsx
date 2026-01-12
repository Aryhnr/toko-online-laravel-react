import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CategoryDropdown({ categories = [], value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const active =
        categories.find((c) => String(c.id) === String(value)) ?? null;

    // close when click outside
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* BUTTON */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="
                    w-full flex items-center justify-between
                    rounded-xl px-4 py-2.5
                    bg-white
                    ring-1 ring-gray-200
                    text-sm
                    hover:bg-gray-50
                    active:scale-[0.98]
                    transition-all
                "
            >
                <span className={active ? "text-gray-900" : "text-gray-400"}>
                    {active ? active.name : "Semua Kategori"}
                </span>

                <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* DROPDOWN */}
            <div
                className={`
                    absolute left-0 right-0 mt-2
                    bg-white rounded-2xl
                    ring-1 ring-gray-200
                    shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                    z-[9999]
                    overflow-hidden
                    transform transition-all duration-200
                    ${
                        open
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                `}
            >
                {/* ALL */}
                <button
                    onClick={() => {
                        onChange("");
                        setOpen(false);
                    }}
                    className="
                        w-full flex items-center justify-between
                        px-4 py-3 text-sm
                        hover:bg-gray-50
                        transition
                    "
                >
                    <span>Semua Kategori</span>
                    {!value && <Check size={16} className="text-[#213448]" />}
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            onChange(cat.id);
                            setOpen(false);
                        }}
                        className="
                            w-full flex items-center justify-between
                            px-4 py-3 text-sm
                            hover:bg-gray-50
                            transition
                        "
                    >
                        <span>{cat.name}</span>
                        {String(value) === String(cat.id) && (
                            <Check size={16} className="text-[#213448]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
