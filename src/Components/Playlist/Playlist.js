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
            <h3>Playlist Title</h3>
            <p># of Songs</p>
            <p>ID</p>
        </div>
    );
}