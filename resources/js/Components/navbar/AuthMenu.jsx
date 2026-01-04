import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import AuthModal from "../modal/AuthModal";
import { User, LogIn, UserPlus } from "lucide-react";

export default function AuthMenu() {
    const [modal, setModal] = useState(null);

    return (
        <>
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
                    <button
                        onClick={() => setModal("login")}
                        className="
                            w-full flex items-center gap-3
                            px-4 py-2.5 text-sm
                            text-gray-700
                            hover:bg-gray-100 hover:text-[#DDA853]
                            transition
                        "
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                    </button>

                    <button
                        onClick={() => setModal("register")}
                        className="
                            w-full flex items-center gap-3
                            px-4 py-2.5 text-sm
                            text-gray-700
                            hover:bg-gray-100 hover:text-[#DDA853]
                            transition
                        "
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
                    </button>
                </div>
            </Dropdown>

            <AuthModal
                type={modal || "login"}
                show={!!modal}
                onClose={() => setModal(null)}
                onSwitch={() =>
                    setModal(modal === "login" ? "register" : "login")
                }
            />
        </>
    );
}
