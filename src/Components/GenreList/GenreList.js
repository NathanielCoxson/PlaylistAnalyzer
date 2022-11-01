import './GenreList.css';
import React from 'react';

export function GenreList(props) {
    const {genres, genreCounts} = props;
    return (
        <div className='GenreList'>
            <ul>
                {genres.map((entry, i) => {
                    return <li key={i} style={{textAlign: 'left'}}>{genreCounts[entry]} {entry}</li>
                })}
            </ul>
        </div>
    );
}