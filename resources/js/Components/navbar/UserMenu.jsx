import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { User, Package, LogOut } from "lucide-react";

export default function UserMenu() {
    return (
        <Dropdown
            align="right"
            trigger={
                <div
                    className="
                        flex items-center justify-center
                        w-10 h-10 rounded-md
                        bg-gray-100 text-gray-700
                        hover:bg-gray-200 hover:text-[#DDA853]
                        transition cursor-pointer
                    "
                >
                    <User className="w-5 h-5" />
                </div>
            }
        >
            <div className="py-1 min-w-[180px]">
                <Link
                    href="/profile"
                    className="
                        flex items-center gap-3
                        px-4 py-2.5 text-sm
                        text-gray-700
                        hover:bg-gray-100 hover:text-[#DDA853]
                        transition
                    "
                >
                    <User className="w-4 h-4" />
                    <span>Profil</span>
                </Link>

                <Link
                    href="/orders"
                    className="
                        flex items-center gap-3
                        px-4 py-2.5 text-sm
                        text-gray-700
                        hover:bg-gray-100 hover:text-[#DDA853]
                        transition
                    "
                >
                    <Package className="w-4 h-4" />
                    <span>Pesanan</span>
                </Link>

                <div className="my-1 border-t border-gray-200" />

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        w-full flex items-center gap-3
                        px-4 py-2.5 text-sm
                        text-red-600
                        hover:bg-red-50
                        transition
                    "
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </Link>
            </div>
        </Dropdown>
    );
}
