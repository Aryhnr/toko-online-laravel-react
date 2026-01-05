import React from "react";
import Pagination from "./Pagination";

export default function Table({ columns, data, pagination }) {
    return (
        <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
            {/* Wrapper utama - Desktop: Table, Mobile: Block */}
            <div className="w-full">
                {/* Di Mobile: <thead> disembunyikan (hidden)
                  Di Desktop (md): ditampilkan (md:table-header-group)
                */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 hidden md:table-header-group">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Di Mobile: <tbody> menjadi block
                      Di Desktop (md): kembali jadi table-row-group
                    */}
                    <tbody className="bg-white divide-y divide-gray-200 block md:table-row-group">
                        {data && data.length > 0 ? (
                            data.map((row, idx) => (
                                <tr
                                    key={row.id || idx}
                                    className="hover:bg-gray-50 transition block md:table-row border-b md:border-none p-4 md:p-0"
                                >
                                    {columns.map((col, i) => (
                                        <td
                                            key={i}
                                            className="
                                                block md:table-cell 
                                                py-1 md:py-4 md:px-6 
                                                text-sm text-gray-700 
                                                before:content-[attr(data-label)] before:font-bold before:text-gray-900 before:inline-block before:w-32 md:before:hidden
                                            "
                                            data-label={col.label}
                                        >
                                            {/* Di atas, `before:content-[attr(data-label)]` akan memunculkan label 
                                                hanya di mobile sebagai pengganti header tabel yang kita sembunyikan.
                                            */}
                                            <span className="inline-block break-words">
                                                {col.render
                                                    ? col.render(row)
                                                    : row[col.field]}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="block md:table-row">
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-12 text-center text-gray-400 block md:table-cell"
                                >
                                    <div className="flex flex-col items-center">
                                        <svg
                                            className="w-12 h-12 text-gray-300 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            />
                                        </svg>
                                        <p className="text-sm italic">
                                            Data tidak ditemukan.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Container */}
            {pagination && pagination.links && (
                <div className="bg-white px-4 py-4 border-t border-gray-200 sm:px-6">
                    <Pagination links={pagination.links} />
                </div>
            )}
        </div>
    );
}
