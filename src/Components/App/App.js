import './App.css';
import { React, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import Spotify from '../../utils/Spotify';
import { PlaylistList } from '../PlaylistList/PlaylistList';
import { GenreList } from '../GenreList/GenreList';
//37i9dQZF1DX03b46zi3S82 size 211
//37i9dQZF1DXa1rZf8gLhyz size 165
//36ag7D1cqumg13l874ohdj size 21

function App() {
    const [artistIds, setArtistIds] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreCounts, setGenreCounts] = useState({});
    const [playlistId, setPlaylistId] = useState('');

    useEffect(() => {
        onSubmit(playlistId)
    }, [playlistId]);

    const onSubmit = async (id) => {
        
        
        Spotify.getPlaylist(id).then(response => {
            setArtistIds(response);
        });
    }

    useEffect(() => {
        Spotify.getGenres(artistIds).then(response => {
            setGenres(response.genres);
            setGenreCounts(response.counts);
        });
    }, [artistIds]);



    return (
        <div className="App">
            <h1>Spotify Playlist Analyzer</h1>
            <SearchBar 
                onSubmit={setPlaylistId}
            />
            <div className='mainContent'>
                <PlaylistList />
                <GenreList 
                    genres={genres}
                    genreCounts={genreCounts}
                />
            </div> 
        </div>
    );
}

export default App;
