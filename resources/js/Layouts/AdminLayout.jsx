import { useState } from "react";
import Sidebar from "@/Components/admin/Sidebar";
import Navbar from "@/Components/admin/Navbar";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
