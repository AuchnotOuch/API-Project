import React from "react";
import { useHistory } from "react-router-dom";
import './Search.css'

const SearchBar = () => {
    // const history = useHistory()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const response = await fetch('/api/search', {
    //         method: 'GET'
    //     })
    //     if (response.ok) {
    //         const data = await response.json()
    //         // history.push('/search')
    //     }
    // }
    return (
        <div className="search-container">
            <form action="/search" method='GET' className="search-bar">
                <input
                    type="text"
                    name="query"
                    placeholder="Search spots..."
                />
                <button type='submit' id="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    )
}

export default SearchBar
