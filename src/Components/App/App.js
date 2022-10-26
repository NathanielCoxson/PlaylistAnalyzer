import './App.css';
import {React, useEffect, useState} from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import Spotify from '../../utils/Spotify';

function App() {
    const [artistIds, setArtistIds] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreCounts, setGenreCounts] = useState({});

    const onSubmit = (id) => {
        Spotify.getPlaylist(id).then((response) => {
            setArtistIds(response);
        });
    }

    useEffect(() => {
        Spotify.getGenres(artistIds).then(response => {
            console.log(response.flat());

            let counts = {};
            response.flat().forEach(genre => {
                if(genre in counts) {
                    counts[genre]++;
                }
                else {
                    counts[genre] = 1;
                }
            });
            
            setGenres(new Set(response.flat()));
            setGenreCounts(counts);
            console.log(genres);
            console.log(counts);
        });
    }, [artistIds]);

    return (
        <div className="App">
            <h1>Spotify Playlist Analyzer</h1>
            <SearchBar 
                onSubmit={onSubmit}
            />
            <p>{artistIds}</p>
            <p>{genres}</p>
            
        </div>
    );
}

export default App;
