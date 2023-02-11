import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Search.css'

const SearchBar = () => {
    const history = useHistory()

    const [query, setQuery] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/search?q=${query}`, {
            method: 'GET'
        })
        if (response.ok) {
            const data = await response.json()
            setQuery('')
            history.push({
                pathname: `/search`,
                search: `?q=${query}`,
                state: {
                    results: data
                }
            })
        }
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} action="/api/search" method='GET' className="search-bar">
                <input
                    type="text"
                    name="q"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search spots..."
                />
                <button type='submit' id="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    )
}

export default SearchBar
