import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search your task here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Search size={19} />
        </div>
    );
}

export default SearchBar;