import SearchIcon from "../Icons/Search";

export default function SearchBar({ mobile = false }) {
    return (
        <form className={mobile ? "md:hidden px-4 py-3 bg-white" : "flex-1"}>
            <div className="w-full">
                <div className="relative">
                    <input
                        type="text"
                        name="q"
                        placeholder="Cari produk..."
                        className="w-full bg-transparent
                        placeholder:text-slate-400
                        text-slate-700 text-sm
                        border border-slate-200 rounded-md
                        pl-3 pr-28 py-2
                        transition duration-300 ease
                        focus:outline-none focus:border-slate-400
                        hover:border-slate-300
                        "
                    />

                    <button
                        className="absolute top-1 right-1 flex items-center py-1 px-2.5 text-center text-sm text-[#213448] 
                        transition-all border-l border-slate-200 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 
                        hover:bg-slate-700 hover:text-white hover:rounded active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                    >
                        <SearchIcon className="w-4 h-4 mr-2" />
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}
