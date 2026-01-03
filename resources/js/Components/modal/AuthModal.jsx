import BaseModal from "./BaseModal";
import AccountIcon from "@/Icons/Account";

export default function AuthModal({ type = "login", show, onClose, onSwitch }) {
    const isLogin = type === "login";

    return (
        <BaseModal show={show} onClose={onClose}>
            {/* Header */}
            <div className="px-6 pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#CBF1F5]">
                    <AccountIcon className="h-6 w-6 text-[#71C9CE]" />
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                    {isLogin ? "Welcome Back" : "Create Your Account"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {isLogin
                        ? "Masuk untuk melanjutkan belanja di TokoKu"
                        : "Daftar untuk mulai belanja dan nikmati berbagai promo"}
                </p>
            </div>

            {/* Form */}
            <div className="px-6 py-6 space-y-4">
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="
                            w-full rounded-md border border-gray-300
                            px-4 py-2.5 text-sm
                            focus:border-[#71C9CE]
                            focus:ring-2 focus:ring-[#71C9CE]/30
                            outline-none
                        "
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="
                        w-full rounded-md border border-gray-300
                        px-4 py-2.5 text-sm
                        focus:border-[#71C9CE]
                        focus:ring-2 focus:ring-[#71C9CE]/30
                        outline-none
                    "
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="
                        w-full rounded-md border border-gray-300
                        px-4 py-2.5 text-sm
                        focus:border-[#71C9CE]
                        focus:ring-2 focus:ring-[#71C9CE]/30
                        outline-none
                    "
                />

                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Konfirmasi Password"
                        className="
                            w-full rounded-md border border-gray-300
                            px-4 py-2.5 text-sm
                            focus:border-[#71C9CE]
                            focus:ring-2 focus:ring-[#71C9CE]/30
                            outline-none
                        "
                    />
                )}

                {/* Primary Button */}
                <button
                    className="
                        w-full rounded-md bg-[#71C9CE]
                        py-2.5 text-sm font-medium text-white
                        hover:bg-[#5bb8bd]
                        transition
                    "
                >
                    {isLogin ? "Login" : "Register"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">atau</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Switch */}
                <p className="text-center text-sm text-gray-500">
                    {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                    <button
                        onClick={onSwitch} // panggil parent untuk ubah state
                        className="font-medium text-[#71C9CE] hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
                <button
                    onClick={onClose}
                    className="
                        w-full text-center text-sm text-gray-400
                        hover:text-gray-600
                        transition
                    "
                >
                    Batal
                </button>
            </div>
        </BaseModal>
    );
}
