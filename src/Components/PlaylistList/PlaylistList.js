import './PlaylistList.css';
import React, { useState } from "react";
import {Playlist} from '../Playlist/Playlist';
import Spotify from "../../utils/Spotify";


export function PlaylistList(props) {
    const [playlists, setPlaylists] = useState();
    const [showPlaylists, setShowPlaylists] = useState(true);
    const {setPlaylistId} = props;

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
        <div className="container">
            <button onClick={handleGetPlaylistsClick}>Get My Playlists</button>
            <button onClick={handleDropdownClick}>Dropdown</button>
            <div className='PlaylistList'>
                {showPlaylists && playlists?.map((playlist, i) => {
                    if(playlist.tracks.total > 0) {
                        return <Playlist 
                        name={playlist.name}
                        total={playlist.tracks.total}
                        id={playlist.id}
                        img={playlist.images.length > 0 ? playlist.images[0].url : ''}
                        key={i}
                        setPlaylistId={setPlaylistId}
                        />
                    }
                    return <div></div>;
                })}
            </div>
        </div>
        
    );
}