let accessToken = '';
const clientId = '3a32785f7f184abfaa9f921c96f3c2dc';
const redirectUri = 'http://localhost:3000/';
const baseUrl = 'https://api.spotify.com/v1/';

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // async getPlaylist(uri) {
    //     const accessToken = this.getAccessToken();
    //     return fetch(`${baseUrl}playlists/${uri}/tracks?limit=100`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(jsonResponse => {
    //         return {
    //             batch: jsonResponse.items.map((item) => item.track.artists[0].id),
    //             next: jsonResponse.next,
    //             total: jsonResponse.total
    //         };
    //     });
    // },

    // async getPlaylistOffset(url) {
    //     const accessToken = this.getAccessToken();
    //     return fetch(url, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(jsonResponse => {
    //         let batch = jsonResponse.items.map((item) => item.track.artists[0].id);
    //         let next = jsonResponse.next;
    //         return {batch, next};
    //     });
    // },
    async getPlaylist(uri) {
        const accessToken = this.getAccessToken();
        let total = 0;
        let offsets = [];
        let batches = [];
        let extraFetches = [];

        let currentBatch = await fetch(`${baseUrl}playlists/${uri}/tracks?limit=100`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            total = jsonResponse.total;
            return jsonResponse.items.map(item => item.track.artists[0].id);
        });
        batches.push(currentBatch);
        
        for(let i = 100; i <= total; i += 100) {
            offsets.push(i);
        }
        offsets.forEach(offset => {
            extraFetches.push(
                fetch(`${baseUrl}playlists/${uri}/tracks?limit=100&offset=${offset}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(response => response.json())
                .then(jsonResponse => jsonResponse.items.map(item => item.track.artists[0].id))
            );
        });

        await Promise.all(extraFetches).then(responses => {
            responses.forEach(response => batches.push(response));
        });
        return batches.flat();
    },

    async getGenres(ids) {
        //Separate artist ids into chunks of 50 for each fetch
        let chunkSize = 50;
        let idChunks = [];
        for(let i = 0; i < ids.length; i += chunkSize){
            idChunks.push(ids.slice(i, i + chunkSize));
        }

        //Create a list of fetches
        let fetches = [];
        idChunks.forEach(chunk => {
            fetches.push(
                fetch(`${baseUrl}artists?ids=${chunk.join(',')}`)
                .then(response => response.json())
                .then(jsonResponse => {
                    return jsonResponse.artists.map(artist => artist.genres);
                })
            );
        });

        //Wait for all fetch responses and create a list of all
        //genres that were found
        let genres = [];
        await Promise.all(fetches).then(responses => {
            responses.forEach(response => {
                genres.push(response.flat());
            });
            genres = genres.flat();
        });
        
        //Count the frequency of each genre in the genres list
        let counts = {}
        genres.forEach(entry => {
            if(entry in counts) {
                counts[entry]++;
            }
            else {
                counts[entry] = 1;
            }
        });
        //Filter out duplicate occurences of each genre
        genres = genres.filter((item, i) => {
            return genres.indexOf(item) === i;
        });
        
        //Return object with a list of unique genres in 
        //the playlist and an object with genre keys
        //that each of a value of the number of occurences
        //they have in the playlist.
        return {
            genres: genres,
            counts: counts
        };
    }
    
};

export default Spotify;