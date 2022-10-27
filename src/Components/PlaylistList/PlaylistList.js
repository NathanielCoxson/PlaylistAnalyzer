import React, { useState } from "react";
import {Playlist} from '../Playlist/Playlist';

export function PlaylistList(props) {
    const [playlists, setPlaylists] = useState();
    
    return (
        <div className='PlaylistList'>
            <Playlist />
        </div>
    );
}