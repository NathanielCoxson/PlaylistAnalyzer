import React, { useState } from "react";
import {Playlist} from '../Playlist/Playlist';

export function PlaylistList(props) {
    const [playlists, setPlaylists] = useState();

    const handleClick = () => {
        props.onGetPlaylistsClick();
    }   

    return (
        <div className='PlaylistList'>
            <button onClick={handleClick}>Get Playlists</button>
        </div>
    );
}