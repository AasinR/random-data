import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";


function NavBar() {
    const menuItems = [
        {
            title: "Data",
            url: "/data",
            cName: "nav-link"
        },
        {
            title: "Home",
            url: "/",
            cName: "nav-link"
        }
    ]

    let [clicked, setClicked] = useState<boolean>(false);

    const handleClick = () => {
        setClicked(!clicked);
    }
    
    return (
        <nav className="nav">
            <h1 className="nav-logo">Navbar</h1>
            <div className="menu-icon" onClick={handleClick}>
                <FontAwesomeIcon icon={clicked ? faTimes : faBars}></FontAwesomeIcon>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {menuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default NavBar;