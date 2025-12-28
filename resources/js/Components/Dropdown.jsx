import { useEffect, useRef, useState } from "react";

export default function Dropdown({ trigger, children, align = "right" }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const alignment =
        align === "left"
            ? "left-0 origin-top-left"
            : "right-0 origin-top-right";

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="focus:outline-none"
            >
                {trigger}
            </button>

            {/* Menu */}
            {open && (
                <div
                    className={`absolute z-50 mt-2 w-48 rounded-md bg-white border shadow-lg ${alignment}`}
                >
                    <div className="py-1">{children}</div>
                </div>
            )}
        </div>
    );
}
