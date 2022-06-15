import React from "react";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="nav">
            <h1 className="nav-logo">Navbar</h1>
            <ul className="nav-links">
                <li><a href="/data">Data</a></li>
                <li><a href="/">Home</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;