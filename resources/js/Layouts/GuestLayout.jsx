import Navbar from "@/Components/Navbar";
import SearchBar from "../Components/SearchBar";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <SearchBar mobile />
            <main className="max-w-7xl mx-auto px-6 py-8 pb-20 md:pb-8">
                {children}
            </main>
        </div>
    );
}
