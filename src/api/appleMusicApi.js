export default class AppleMusicApi {
    constructor({ developerToken, userToken }) {
        this.developerToken = developerToken;
        this.base_uri = "https://api.music.apple.com";
        this.market = "";
        this.userToken = userToken || null;
        this.loggedIn = userToken !== undefined;
        this.headers = {
            Authorization: "Bearer " + developerToken,
            "Music-User-Token": userToken || null,
        };
        this.init();
    }

    async init() {
        if (!this.userToken) return;
        await this.getUserStorefront();
    }

    setUserToken(userToken) {
        this.userToken = userToken;
        this.headers = {
            Authorization: "Bearer " + this.developerToken,
            "Music-User-Token": this.userToken,
        };
    }

    setLoggedIn(bool) {
        this.loggedIn = bool;
    }

    async getUserStorefront() {
        const response = await fetch(`${this.base_uri}/v1/me/storefront`, {
            headers: this.headers,
        }).then((res) => res.json());

        this.market = response.data[0].id;
        return response;
    }

    async getAlbumById(album_id, market = this.market) {
        const response = await fetch(
            `${this.base_uri}/v1/catalog/${market}/albums/${album_id}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        return response.data[0]?.relationships?.tracks?.data.map((album) => ({
            id: album.id,
            type: album.type,
        }));
    }

    async getTracksByIsrc(isrc) {
        let response;
        let ids;

        response = await fetch(
            `${this.base_uri}/v1/catalog/${this.market}/songs?filter[isrc]=${isrc}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        /* Since not every track returned by the ISRC search is available irrespective of the storefront/market, we have to first get the local equivalents */
        if (response.data?.length) {
            ids = response.data.map((result) => result.id);
            response = await this.getEquivalent(ids);
        }

        return response.data;
    }
    async checkIfLibraryContains(ids) {
        const response = await fetch(
            `${this.base_uri}/v1/catalog/${this.market}/songs?ids=${ids}&include=library`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        // this gets us the ratings, however, it's not really useful since rated (aka loved or dislike) songs are neither automatically added to the library, nor can be seen in the apple music app at all at a glance
        // const response = await fetch(
        //     `${this.base_uri}/v1/me/ratings/songs?ids=${ids}`,
        //     {
        //         headers: this.headers,
        //     }
        // ).then((res) => res.json());

        console.log(response)
        return response.data.map(
            (item) => item.relationships.library.data.length > 0
        );
    }

    async getAvailableMarkets() {
        return await fetch(`${this.base_uri}/storefronts`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async search(term, { market = this.market, type = "songs" }) {
        const formatTerm = (val) => {
            return val.replace(/&/g, "").split(" ").join("+");
        };

        const response = await fetch(
            `${this.base_uri}/v1/catalog/${market}/search?term=${formatTerm(
                term
            )}&types=${type}&limit=25`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
        console.log(response)

        return response.results?.[type]?.data || [];
    }

    async getUserPlaylists() {
        let playlists = [];
        let response = await fetch(`${this.base_uri}/v1/me/library/playlists`, {
            headers: this.headers,
        }).then((res) => res.json());
        playlists = response.data.map((playlist) => {
            return { name: playlist.attributes.name, id: playlist.id };
        });

        while (response.next) {
            response = await fetch(`${this.base_uri + response.next}`, {
                headers: this.headers,
            }).then((res) => res.json());

            playlists = playlists.concat(
                response.data.map((playlist) => {
                    return { name: playlist.attributes.name, id: playlist.id };
                })
            );
        }

        return playlists;
    }

    async createPlaylist(name, description = "Made With Anything to AM", data) {
        let LibraryPlaylistCreationRequest = {
            attributes: {
                name,
                description,
            },
            relationships: {
                tracks: {
                    data,
                },
            },
        };

        return await fetch(`${this.base_uri}/v1/me/library/playlists`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(LibraryPlaylistCreationRequest),
        }).then((res) => res.json());
    }

    async getPlaylistTracks(playlist_id, options) {
        let tracks = [];
        let response;
        response = await fetch(
            `${this.base_uri}/v1/me/library/playlists/${playlist_id}/tracks?&include=catalog`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());

        tracks = tracks.concat(response.data);

        while (response.next) {
            response = await fetch(
                "https://api.music.apple.com" + response.next + "&include=catalog",
                {
                    headers: this.headers,
                }
            ).then((res) => res.json());

            tracks = tracks.concat(response.data);
        }
        console.log(tracks)

        return tracks.map((item) => ({
            name: item.attributes.name,
            id: item.id || null,
            isrc: item.relationships?.catalog.data[0]?.attributes?.isrc || null,
            artistName: item.attributes?.artistName || null,
            albumName: item.attributes?.albumName || null,
        }));
    }

    async getUserLibrary() {
        return await fetch(`${this.base_uri}/v1/me/library/songs`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async getCatalogPlaylist(id, market = "at") {
        return await fetch(`${this.base_uri}/v1/catalog/${market}/playlists/${id}`, {
            headers: this.headers,
        }).then((res) => res.json());
    }

    async getLocalEquivalents(equivalents, market = "at") {
        return await fetch(
            `${this.base_uri}/v1/catalog/${market}/playlists/songs?filter[${equivalents}]`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }

    async getAlbumByUpc(upc, isrc, title, positionInAlbum) {
        return await fetch(
            `${this.base_uri}/v1/catalog/${this.market}/albums?filter[upc]=${upc}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }

    async getTrackById(track_id) {
        return await fetch(
            `${this.base_uri}/v1/catalog/${this.market}/songs/${track_id}`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }

    async getCatalogTracks(ids, { market = this.market }) {
        return await fetch(
            `${this.base_uri}/v1/catalog/${market}/songs?ids=${ids}?include=albums&extend=upc`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }

    async getEquivalent(ids) {
        const response = await fetch(
            `${this.base_uri}/v1/catalog/at/songs?filter[equivalents]=${ids}&extend=[contentRating]`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
        console.log(response)

        return response;
    }

    async getUserTrack(id) {
        return await fetch(
            `${this.base_uri}/v1/me/library/songs/${id}?extend=releaseDate`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }

    async searchAlbum(trackName, albumName = "", artistName = "") {
        let term = `${trackName}+${albumName}+${artistName}`;

        const formatTerm = (val) => {
            return val.replace(/&/g, "").replace(/-/g, " ").split(" ").join("+");
        };

        return await fetch(
            `${this.base_uri}/v1/catalog/${this.market}/search?term=${formatTerm(
                term
            )}&types=albums&limit=5`,
            {
                headers: this.headers,
            }
        ).then((res) => res.json());
    }
}
