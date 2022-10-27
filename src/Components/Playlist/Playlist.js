import React from "react";
import './Playlist.css';

export function Playlist(props) {

    //Information to Display:
    //Title
    //Number of songs

    //What actions can be taken?:
    //Select playlist to be analyzed
    return (
        <div className='Playlist'>
            {props.img ? <img src={props.img}/> : <div className='imgFiller'></div>}
            <div className='title'>
                <h3>{props.name}</h3>
            </div>
            <div className='songCount'>
                <p>{props.total === 1 ? '1 Song' : props.total + ' Songs'}</p>
            </div>
            <div className='ID'>
                <p>{props.id}</p>
            </div>
        </div>
    );
}