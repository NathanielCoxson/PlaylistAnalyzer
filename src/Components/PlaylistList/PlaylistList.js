import React, { useState } from "react";
import {Playlist} from '../Playlist/Playlist';
import Spotify from "../../utils/Spotify";

export function PlaylistList(props) {
    const [playlists, setPlaylists] = useState();
    const [showPlaylists, setShowPlaylists] = useState(true);

    const handleGetPlaylistsClick = (event) => {
        onGetPlaylistsClick();
        setShowPlaylists(true);
    }   

    const onGetPlaylistsClick = async () => {
        const userId = await Spotify.getUserId();
        Spotify.getUsersPlaylists(userId).then(response => {
            setPlaylists(response);
        });
    }

    const handleDropdownClick = (event) => {
        if(showPlaylists) {
            setShowPlaylists(false);
        }
        else {
            setShowPlaylists(true);
        }
    }

    return (
        <div className='PlaylistList'>
            <button onClick={handleGetPlaylistsClick}>Get My Playlists</button>
            <button onClick={handleDropdownClick}>Dropdown</button>
            {showPlaylists && playlists?.map((playlist, i) => {
                return <Playlist 
                    name={playlist.name}
                    total={playlist.tracks.total}
                    id={playlist.id}
                    key={i}
                />
            })}
        </div>
    );
}