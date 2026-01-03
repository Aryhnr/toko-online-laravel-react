import { Link, usePage } from "@inertiajs/react";
import HomeIcon from "@/Icons/Home";
import CategoryIcon from "@/Icons/Category";
import CartIcon from "@/Icons/Cart";
import AccountIcon from "@/Icons/Account";

export default function NavbarBottom() {
    const { url } = usePage();

    const navItem = (href, Icon, label) => {
        const active = url === href;

        return (
            <Link
                href={href}
                className={`flex flex-col items-center gap-1
                transition
                ${
                    active
                        ? "text-[#71C9CE]"
                        : "text-gray-500 hover:text-[#71C9CE]"
                }`}
            >
                <Icon className={`w-6 h-6 ${active ? "scale-110" : ""}`} />
                <span className="text-xs">{label}</span>
            </Link>
        );
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-1px_2px_rgba(0,0,0,0.05)] md:hidden">
            <div className="flex justify-around py-4">
                {navItem("/", HomeIcon, "Home")}
                {navItem("/kategori", CategoryIcon, "Kategori")}
                {navItem("/cart", CartIcon, "Cart")}
                {navItem("/login", AccountIcon, "Akun")}
            </div>
        </nav>
    );
}
