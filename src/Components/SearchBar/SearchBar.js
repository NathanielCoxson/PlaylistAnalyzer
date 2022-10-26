import './SearchBar.css';
import React, { useState } from "react";

export function SearchBar(props) {
    const [id, setId] = useState();

    const handleChange = ({target}) => {
        setId(() => target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(() => id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange}
                    placeholder='Playlist ID'
                />
                    
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    );
}
