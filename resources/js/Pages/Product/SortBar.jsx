import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function SortBar({ sort, setSort }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const options = [
        { value: "latest", label: "Terbaru" },
        { value: "cheapest", label: "Termurah" },
    ];

    const active = options.find((o) => o.value === sort);

    /* CLOSE ON CLICK OUTSIDE */
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
        <div ref={ref} className="relative flex justify-end z-30">
            {/* BUTTON */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="
                    flex items-center gap-2
                    px-4 py-2.5 rounded-xl
                    bg-white
                    ring-1 ring-gray-200
                    text-sm text-gray-700
                    hover:bg-gray-50
                    active:scale-[0.98]
                    transition-all duration-200
                "
            >
                <span className="text-gray-500">Urutkan</span>
                <span className="font-medium text-gray-900">
                    {active.label}
                </span>
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* DROPDOWN */}
            <div
                className={`
                    absolute right-0 mt-11 w-48
                    bg-white rounded-2xl
                    ring-1 ring-gray-200
                    shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                    overflow-hidden z-30
                    transform transition-all duration-200
                    ${
                        open
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                `}
            >
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => {
                            setSort(opt.value);
                            setOpen(false);
                        }}
                        className="
                            w-full flex items-center justify-between
                            px-4 py-3 text-sm
                            text-gray-700
                            hover:bg-gray-50
                            transition
                        "
                    >
                        <span>{opt.label}</span>
                        {sort === opt.value && (
                            <Check size={16} className="text-[#213448]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
