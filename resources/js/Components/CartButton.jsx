import { Link } from "@inertiajs/react";
import CartIcon from "@/Icons/Cart";

export default function CartButton() {
    return (
        <Link
            href="/cart"
            className="flex items-center justify-center
                       w-10 h-10 rounded-md
                       bg-gray-100 text-gray-700
                       hover:bg-gray-200 hover:text-[#71C9CE]
                       transition"
        >
            <CartIcon className="w-5 h-5" />
        </Link>
    );
}
