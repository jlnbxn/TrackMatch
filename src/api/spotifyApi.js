export default class SpotifyApi {
    constructor({ client_id, redirect_uri, access_token, scopes }) {
        this.client_id = client_id;
        this.base_uri = "https://api.spotify.com/v1";
        this.market = "";
        this.access_token = access_token || null;
        this.loggedIn = access_token !== undefined;
        this.headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (access_token || ""),
        };
        this.scopes = scopes;
        this.redirect_uri = redirect_uri;
        this.allMarkets = []

        this.init();
    }

    async init() {
        if (!this.access_token) return;
        this.market = await this.getCurrentUser().then((res) => res.country);
        this.user_id = await this.getCurrentUser().then((res) => res.id);
    }




    getLoginUrl() {
        return (
            "https://accounts.spotify.com/authorize?client_id=" +
            this.client_id +
            "&redirect_uri=" +
            encodeURIComponent(this.redirect_uri) +
            "&scope=" +
            encodeURIComponent(this.scopes.join(" ")) +
            "&response_type=code"
        );
    }

    async getCurrentUser() {
        return fetch(`${this.base_uri}/me`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async setAccessToken(access_token) {
        this.access_token = access_token;
        this.headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        };
        this.market = await this.getCurrentUser().then((res) => res.country);
        this.user_id = await this.getCurrentUser().then((res) => res.id);
    }

    async checkIfLibraryContains(ids, type) {
        if (type === "songs") {
            type = "tracks";
        }
        if (type === "albums") {
            type = "albums";
        }
        return await fetch(`${this.base_uri}/me/${type}/contains?ids=${ids}`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async getAlbumById(album_id, market = this.market) {
        const response = await fetch(
            `${this.base_uri}/albums/${album_id}?market=${market}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
        return response.tracks.items.map((item) => item.id);
    }

    async getTracksByIsrc(isrc) {
        const response = await fetch(
            `${this.base_uri}/search?q=isrc:${isrc}&type=track`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
        console.log(response)

        return response.tracks.items;
    }

    async search(term, { market = this.market, type = "track", offset = 0 }) {
        let responseType;
        // The following conditionals deal with the fact that the 'type' in the query is a different one than the object key in the response
        if (type === "songs") {
            type = "track";
            responseType = "tracks";
        }
        if (type === "albums") {
            type = "album";
            responseType = "albums";
        }

        const response = await fetch(
            `${this.base_uri}/search?market=${market}&q=${term}&type=${type}&limit=50&offset=${offset}`,
            {
                method: "GET",
                headers: this.headers,
            }
        ).then((res) => res.json());

        return response?.[responseType]?.items || [];
    }

    async getUserPlaylists() {
        let playlists = [];
        let response;

        response = await fetch(`${this.base_uri}/me/playlists`, {
            headers: this.headers,
        }).then((res) => res.json());

        playlists = response.items;

        while (response.next !== null) {
            response = await fetch(response.next, {
                headers: this.headers,
            }).then((res) => res.json());

            playlists = playlists.concat(response.items);
        }

        // Make the playlist object uniform
        playlists = playlists.map((item) => ({ name: item.name, id: item.id }));

        // Add "My Saved Tracks" as a playlist, so users can use their library for transfers
        playlists.unshift({ name: "My Saved Tracks", id: "library" });

        return playlists;
    }

    async createPlaylist(name, description, tracks, isPublic = false) {
        let request = {
            name: name,
            description: description,
            public: isPublic,
        };

        const response = await fetch(
            `${this.base_uri}/users/${this.user_id}/playlists`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(request),
            }
        ).then((res) => res.json());

        let uris = tracks.map((track) => `spotify:track:${track.id}`);

        return await this.addItemsToPlaylist(response.id, uris);
    }

    async addItemsToPlaylist(playlist_id, uris) {
        let request = { uris: uris };
        return await fetch(`${this.base_uri}/playlists/${playlist_id}/tracks`, {
            method: "POST",
            headers: this.headers,

            body: JSON.stringify(request),
        }).then((res) => res.json());
    }

    async getAvailableMarkets() {
        return fetch(`${this.base_uri}/markets`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async getPlaylistTracks(playlist_id) {
        let fields =
            "next,items(track(name,id,external_ids,album(name),artists(name)))";
        let response;
        let tracks;

        if (playlist_id === "library") {
            return await this.getUserLibrary();
        }

        response = await fetch(
            `${this.base_uri}/playlists/${playlist_id}/tracks?limit=50&fields=${fields}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        tracks = response.items;

        while (response.next !== null) {
            response = await fetch(response.next, {
                headers: this.headers,
            }).then((res) => res.json());

            tracks = tracks.concat(response.items);
        }

        return tracks.map((item) => ({
            id: item.track?.id,
            isrc: item.track.external_ids?.isrc,
            name: item.track.name,
            albumName: item.track.album?.name,
            artistName: item.track.artists[0]?.name,
        }));
    }

    async getUserLibrary() {
        let fields = "items(is_local,track(id,external_ids))";
        let response;
        let tracks;

        response = await fetch(
            `${this.base_uri}/me/tracks?limit=50&fields=${fields}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        tracks = response.items;

        while (response.next !== null) {
            response = await fetch(response.next, {
                headers: this.headers,
            }).then((res) => res.json());

            tracks = tracks.concat(response.items);
        }

        return tracks.map((item) => ({
            id: item.track?.id,
            isrc: item.track.external_ids?.isrc,
            name: item.track.name,
        }));
    }
}
