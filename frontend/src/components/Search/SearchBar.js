import React from "react";
import './Search.css'
const SearchBar = () => {

    return (
        <div className="search-container">
            <div className="search-bar">
                <div>input</div>
                <button id="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
    )
}

export default SearchBar
