import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex justify-center items-center gap-1 px-6 py-4 border-t bg-gray-50">
            {links.map((link, index) => {
                // Parse label untuk menghilangkan HTML entities
                const label = link.label
                    .replace("&laquo;", "«")
                    .replace("&raquo;", "»")
                    .replace("Previous", "‹")
                    .replace("Next", "›");

                return (
                    <span key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                                    link.active
                                        ? "bg-[#213448] text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                                preserveScroll
                            >
                                {label}
                            </Link>
                        ) : (
                            <span className="px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                                {label}
                            </span>
                        )}
                    </span>
                );
            })}
        </div>
    );
}
