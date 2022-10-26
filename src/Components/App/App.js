import './App.css';
import {React, useState} from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import Spotify from '../../utils/Spotify';

function App() {
    const [id, setId] = useState();
    const accessToken = Spotify.getAccessToken();
    return (
        <div className="App">
            <h1>Spotify Playlist Analyzer</h1>
            <SearchBar 
                onSubmit={setId}
            />
            <p>{id}</p>
            <p>{accessToken}</p>
        </div>
    );
}

export default App;
