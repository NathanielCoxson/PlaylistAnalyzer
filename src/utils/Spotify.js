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

    async getPlaylist(uri) {
        const accessToken = this.getAccessToken();
        return fetch(`${baseUrl}playlists/${uri}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            return jsonResponse.tracks.items.map((item) => ({
                name: item.track.name,
                artist: item.track.artists[0].name
            }));
        });
    }
};

export default Spotify;