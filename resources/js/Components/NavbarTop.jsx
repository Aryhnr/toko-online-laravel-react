import { Link, usePage } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import CategoryIcon from "../Icons/Category";
import CartIcon from "../Icons/Cart";
import AccountIcon from "../Icons/Account";

export default function NavbarTop() {
    const { url } = usePage();

    const isActive = (path) =>
        url === path
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600";

    return (
        <nav className="hidden md:block sticky top-0 z-50 shadow-2xs">
            <div className="bg-[#213448]">
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm text-white">
                    {/* Left: Contact Info */}
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-phone"></i>
                            <a
                                href="tel:+628123456789"
                                className="hover:text-[#71C9CE]"
                            >
                                +62 812-3456-789
                            </a>
                        </span>

                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope"></i>
                            <a
                                href="mailto:cs@tokoku.com"
                                className="hover:text-[#71C9CE]"
                            >
                                cs@tokoku.com
                            </a>
                        </span>
                    </div>

                    {/* Right: Optional Info */}
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-gray-500">
                            Gratis Ongkir &gt; Rp100rb
                        </span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-4 flex bg-white items-center justify-between gap-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold text-[#DDA853] shrink-0"
                >
                    TokoKu
                </Link>

                {/* Search + Kategori */}
                <div className="flex flex-1 items-center gap-3 px-6">
                    {/* Dropdown Kategori */}
                    <Dropdown
                        align="left"
                        trigger={
                            <div
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700
                                            bg-gray-100 hover:bg-[#CBF1F5]
                                            transition cursor-pointer"
                            >
                                {/* Icon Kategori */}
                                <CategoryIcon className="w-5 h-5 text-[#DDA853] mr-2" />
                                {/* Text */}
                                <span>Kategori</span>
                                {/* Arrow */}
                                <i className="fa-solid fa-angle-down ml-3 text-xs text-gray-500"></i>
                            </div>
                        }
                    >
                        <Link
                            href="/kategori/makanan"
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Makanan
                        </Link>
                        <Link
                            href="/kategori/minuman"
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Minuman
                        </Link>
                        <Link
                            href="/kategori/snack"
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Snack
                        </Link>
                    </Dropdown>
                    <SearchBar />
                </div>

                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="flex items-center justify-center
                        w-10 h-10 rounded-md
                        bg-gray-100 text-gray-700
                        hover:bg-gray-200 hover:text-[#71C9CE]
                        transition"
                    >
                        <CartIcon className="w-5 h-4" />
                    </Link>
                    {/* User / Login */}
                    <Link
                        href="/login"
                        className="flex items-center justify-center
                        w-10 h-10 rounded-md
                        bg-gray-100 text-gray-700
                        hover:bg-gray-200 hover:text-[#71C9CE]
                        transition"
                    >
                        <AccountIcon className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
