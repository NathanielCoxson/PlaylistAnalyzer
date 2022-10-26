import './App.css';
import {React, useState} from 'react';
import {SearchBar} from '../SearchBar/SearchBar';

function App() {
    const [id, setId] = useState();
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
