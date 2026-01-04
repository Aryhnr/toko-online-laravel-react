import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Settings,
    X,
} from "lucide-react";

export default function Sidebar({ open, onClose }) {
    const { url } = usePage();

    const sections = [
        {
            title: "MAIN",
            items: [
                {
                    name: "Dashboard",
                    href: "/admin/dashboard",
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            title: "MANAGEMENT",
            items: [
                { name: "Products", href: "/admin/products", icon: Package },
                { name: "Categories", href: "/admin/categories", icon: Tags },
                { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
                { name: "Customers", href: "/admin/customers", icon: Users },
            ],
        },
        {
            title: "SYSTEM",
            items: [
                { name: "Settings", href: "/admin/settings", icon: Settings },
            ],
        },
    ];

    return (
        <>
            {/* Overlay (Mobile) */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static inset-y-0 left-0 z-50
                    w-64 bg-white shadow-xl
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-6">
                    <span className="text-lg font-bold text-[#213448]">
                        Admin Panel
                    </span>

                    {/* Close (Mobile) */}
                    <button
                        onClick={onClose}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="px-4 py-4 space-y-6">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400">
                                {section.title}
                            </p>

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = url.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                                                transition
                                                ${
                                                    active
                                                        ? "bg-[#213448] text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                }
                                            `}
                                        >
                                            <Icon size={18} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
