import './GenreList.css';
import React from 'react';

export function GenreList(props) {
    const {genres, genreCounts} = props;

    // let totalCount = 0;
    // for(const key in genreCounts) {
    //     totalCount += genreCounts[key];
    // }

    return (
        <div className='GenreList'>
            <ul>
                {genres.map((entry, i) => {
                    return <li key={i}>{genreCounts[entry]} {entry}</li>
                })}
            </ul>
            {/* {genres.map((entry, i) => {
                const percentage = (genreCounts[entry]/totalCount) * 100;
                console.log(percentage);
                return (
                    <div>
                        <div
                            className='bar'
                            style={{
                                width: `${percentage}%`
                            }}
                        >
                        </div>
                        <p>{entry}</p>
                    </div>   
                )
            })} */}
        </div>
    );
}