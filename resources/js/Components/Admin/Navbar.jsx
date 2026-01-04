import { Link } from "@inertiajs/react";
import { Menu, LogOut, User } from "lucide-react";

export default function Navbar({ onMenuClick }) {
    return (
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
            {/* Left */}
            <div className="flex items-center gap-3">
                {/* Hamburger (Mobile) */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-[#213448]"
                >
                    <Menu size={22} />
                </button>

                <h1 className="hidden md:block text-lg font-semibold text-[#213448]">
                    Admin Dashboard
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#213448]/10 text-[#213448]">
                    <User size={16} />
                    <span className="text-sm font-medium">Admin</span>
                </div>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        flex items-center justify-center
                        w-9 h-9 rounded-full
                        bg-[#DDA853]/20 text-[#DDA853]
                        hover:bg-[#DDA853]/30
                        transition
                    "
                >
                    <LogOut size={16} />
                </Link>
            </div>
        </header>
    );
}
