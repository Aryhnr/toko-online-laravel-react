import BaseModal from "./BaseModal";
import AccountIcon from "@/Icons/Account";
import { useForm } from "@inertiajs/react";

export default function AuthModal({ type = "login", show, onClose, onSwitch }) {
    const isLogin = type === "login";

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(isLogin ? "/login" : "/register", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

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
            <form onSubmit={submit} className="px-6 py-6 space-y-4">
                {!isLogin && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#71C9CE] focus:ring-2 focus:ring-[#71C9CE]/30 outline-none"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                )}

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#71C9CE] focus:ring-2 focus:ring-[#71C9CE]/30 outline-none"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#71C9CE] focus:ring-2 focus:ring-[#71C9CE]/30 outline-none"
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {!isLogin && (
                    <div>
                        <input
                            type="password"
                            placeholder="Konfirmasi Password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#71C9CE] focus:ring-2 focus:ring-[#71C9CE]/30 outline-none"
                        />
                    </div>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-[#71C9CE] py-2.5 text-sm font-medium text-white hover:bg-[#5bb8bd] transition disabled:opacity-60"
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
                        type="button"
                        onClick={() => {
                            reset();
                            onSwitch();
                        }}
                        className="font-medium text-[#71C9CE] hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6">
                <button
                    onClick={() => {
                        reset();
                        onClose();
                    }}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition"
                >
                    Batal
                </button>
            </div>
        </BaseModal>
    );
}
