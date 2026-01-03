import { useState } from "react";
import { Link } from "@inertiajs/react";

import Dropdown from "@/Components/Dropdown";
import AuthModal from "@/Components/modal/AuthModal";

import AccountIcon from "@/Icons/Account";
import CartIcon from "@/Icons/Cart";

export default function AuthMenu() {
    const [modal, setModal] = useState(null);

    return (
        <>
            <div className="flex items-center gap-3">
                {/* Cart */}
                <Link
                    href="/cart"
                    className="
                        flex items-center justify-center
                        w-10 h-10 rounded-md
                        bg-gray-100 text-gray-700
                        hover:bg-gray-200 hover:text-[#71C9CE]
                        transition
                    "
                >
                    <CartIcon className="w-5 h-5" />
                </Link>

                {/* Auth Dropdown */}
                <Dropdown
                    align="right"
                    trigger={
                        <div
                            className="
                                flex items-center justify-center
                                w-10 h-10 rounded-md
                                bg-gray-100 text-gray-700
                                hover:bg-gray-200 hover:text-[#71C9CE]
                                transition cursor-pointer
                            "
                        >
                            <AccountIcon className="w-5 h-5" />
                        </div>
                    }
                >
                    <div className="py-1 min-w-[180px]">
                        <button
                            onClick={() => setModal("login")}
                            className="
                                w-full flex items-center gap-3
                                px-4 py-2.5
                                text-sm text-gray-700
                                hover:bg-gray-100 hover:text-[#71C9CE]
                                transition
                            "
                        >
                            <AccountIcon className="w-4 h-4 text-gray-500" />
                            <span>Login</span>
                        </button>

                        <button
                            onClick={() => setModal("register")}
                            className="
                                w-full flex items-center gap-3
                                px-4 py-2.5
                                text-sm text-gray-700
                                hover:bg-gray-100 hover:text-[#71C9CE]
                                transition
                            "
                        >
                            <AccountIcon className="w-4 h-4 text-gray-500" />
                            <span>Register</span>
                        </button>
                    </div>
                </Dropdown>
            </div>

            {/* Modals */}
            <AuthModal
                type={modal || "login"} // default login kalau null
                show={!!modal} // true kalau modal ada
                onClose={() => setModal(null)}
                onSwitch={() =>
                    setModal(modal === "login" ? "register" : "login")
                }
            />
        </>
    );
}
