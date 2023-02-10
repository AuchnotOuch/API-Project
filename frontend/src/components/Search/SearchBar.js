import React from "react";
import './Search.css'
const SearchBar = () => {

    return (
        <div className="search-container">
            <form className="search-bar">
                <input
                    type="text"
                    placeholder="Search spots..."
                />
                <button id="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    )
}

export default SearchBar
