import React from "react";
import './Playlist.css';

export function Playlist(props) {
    const {setPlaylistId} = props;

    const handleClick = (event) => {
        event.preventDefault();
        setPlaylistId(() => props.id);
    }

    return (
        <div className='Playlist'>
            {props.img ? <img src={props.img} alt="playlist cover"/> : <div className='imgFiller'></div>}
            <div className='title'>
                <h3>{props.name}</h3>
            </div>
            <div className='songCount'>
                <p>{props.total === 1 ? '1 Song' : props.total + ' Songs'}</p>
            </div>
            <div className='ID'>
                <p>{props.id}</p>
            </div>
            <div className='button'>
                <button
                    onClick={handleClick}
                >+</button>
            </div>
        </div>
    );
}