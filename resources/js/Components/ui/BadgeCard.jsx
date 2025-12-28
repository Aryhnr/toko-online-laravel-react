export default function BadgeCard({
    label,
    variant = "dark",
    position = "top-left",
}) {
    const variants = {
        dark: "bg-black text-white",
        primary: "bg-[#213448] text-white",
        danger: "bg-red-500 text-white",
        success: "bg-green-500 text-white",
        outline: "border border-black text-black bg-white",
    };

    const positions = {
        "top-left": "top-3 left-3",
        "top-right": "top-3 right-3",
        "bottom-left": "bottom-3 left-3",
        "bottom-right": "bottom-3 right-3",
    };

    return (
        <span
            className={`
                absolute z-10 text-xs px-2 py-1 rounded
                ${variants[variant]}
                ${positions[position]}
            `}
        >
            {label}
        </span>
    );
}
