import './App.css';
import {React, useState} from 'react';
import {SearchBar} from '../SearchBar/SearchBar';
import Spotify from '../../utils/Spotify';

function App() {
    const [id, setId] = useState();
    Spotify.getPlaylist('3HWoRESCLzn7fYwmIDk81n').then((response) => {
        console.log(response);
    });
    return (
        <div className="App">
            <h1>Spotify Playlist Analyzer</h1>
            <SearchBar 
                onSubmit={setId}
            />
            <p>{id}</p>
        </div>
    );
}

export default App;
