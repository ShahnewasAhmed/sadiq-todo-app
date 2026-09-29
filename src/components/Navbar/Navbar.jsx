import { Search } from "lucide-react";
import "./Navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {

    const today = new Date();

    const dayName = today.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "Asia/Dhaka"
    });

    const date = today.toLocaleDateString("en-GB", {
        timeZone: "Asia/Dhaka"
    });
    return (
        <header className="navbar">

            {/* Logo */}
            <div className="navbar-logo">
                <img
                    src="/sadiq_logo.svg"
                    alt="Sadiq"
                    className="navbar-logo-img"
                />
            </div>

            {/* Search */}
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search your task here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Search size={20} />
            </div>

            {/* Right side */}
            <div className="navbar-right">

                <div className="date-info">
                    <strong>{dayName}</strong>
                    <span>{date}</span>
                </div>
            </div>

        </header>
    );
}

export default Navbar;