export default function Dropdown({ trigger, children, align = "right" }) {
    const alignment = align === "left" ? "left-0" : "right-0";

    return (
        <div className="relative inline-block group">
            {/* Trigger */}
            <div className="cursor-pointer select-none">{trigger}</div>

            {/* HOVER BRIDGE (transparan, tapi aktif) */}
            <div className="absolute left-0 right-0 top-full h-3"></div>

            {/* Menu */}
            <div
                className={`
                    absolute top-full mt-3 z-50 w-48
                    rounded-md bg-white border border-gray-200 shadow-lg
                    opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    pointer-events-none group-hover:pointer-events-auto
                    transition duration-150
                    ${alignment}
                `}
            >
                <div className="py-1">{children}</div>
            </div>
        </div>
    );
}
