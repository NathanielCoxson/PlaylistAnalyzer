import React from "react";
import './Playlist.css';

export function Playlist(props) {

    //Information to Display:
    //Title
    //Number of songs

    //What actions can be taken?:
    //Select playlist to be analyzed
    return (
        <div className='Playlist'>
            <h3>{props.name}</h3>
            <p>{props.total === 1 ? '1 Song' : props.total + ' Songs'}</p>
            <p>{props.id}</p>
        </div>
    );
}