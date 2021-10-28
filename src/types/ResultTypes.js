// export class AppleMusicTrack {
//   constructor(result) {
//     this.title = result.attributes?.name;
//     this.artistName = result.attributes?.artistName;
//     this.albumName = result.attributes?.albumName;
//     this.artworkUrl = result.attributes?.artwork.url
//       .replace("{w}", 200)
//       .replace("{h}", 200);
//     this.artworkBg = `#${result.attributes?.artwork.bgColor}`;
//     this.durationMs = result.attributes?.durationInMillis;
//     this.releaseDate = result.attributes?.releaseDate;
//     this.previewUrl = result.attributes?.previews[0].url;
//     this.isrc = result.attributes?.isrc;
//     this.id = result.id;
//   }
// }

// export class AppleMusicAlbum {
//   constructor(result) {
//     this.title = result.attributes?.name;
//     this.artistName = result.attributes?.artistName;
//     this.albumName = null;
//     this.artworkUrl = result.attributes?.artwork.url
//       .replace("{w}", 200)
//       .replace("{h}", 200);
//     this.artworkBg = `#${result.attributes?.artwork.bgColor}`;
//     this.durationMs = null;
//     this.releaseDate = result.attributes?.releaseDate;
//     this.previewUrl = null;
//     this.isrc = null;
//     this.id = result.id;
//   }
// }

// export class SpotifyTrack {
//   constructor(result) {
//     this.title = result?.name;
//     this.artistName = result?.artists[0]?.name;
//     this.albumName = result?.album.name;
//     this.artworkUrl = result?.album.images[0]?.url || "";
//     this.artworkBg = null;
//     this.durationMs = result?.duration_ms;
//     this.releaseDate = new Date(result?.album.release_date).toLocaleDateString(
//       "en-US"
//     );
//     this.previewUrl = result?.preview_url;
//     this.isrc = result?.external_ids.isrc;
//     this.id = result?.id;
//   }
// }

// export class SpotifyAlbum {
//   constructor(result) {
//     this.title = result?.name;
//     this.artistName = result?.artists[0].name;
//     this.albumName = null;
//     this.artworkUrl = result?.images[0]?.url || null;
//     this.artworkBg = null;
//     this.durationMs = null;
//     this.releaseDate = result?.release_date;
//     this.previewUrl = null;
//     this.isrc = null;
//     this.id = result?.id;
//   }
// }

// export class AppleMusicPlaylist {
//   constructor(result) {
//     this.title = result.attributes.name;
//     this.artistName = result.attributes.artistName;
//     this.albumName = result.attributes.albumName;
//     this.isrc = result.attributes.isrc;
//     this.id = result.id;
//   }
// }

export class Track {
    constructor(vendor, result) {
        this.parseMetadata(vendor, result);
    }

    parseMetadata(vendor, result) {
        if (vendor === "appleMusic") {
            this.title = result.attributes?.name;
            this.artistName = result.attributes?.artistName;
            this.albumName = result.attributes?.albumName;
            this.artworkUrl = result.attributes?.artwork.url
                .replace("{w}", 200)
                .replace("{h}", 200);
            this.artworkBg = `#${result.attributes?.artwork.bgColor}`;
            this.durationMs = result.attributes?.durationInMillis;
            this.releaseDate = result.attributes?.releaseDate;
            this.previewUrl = result.attributes?.previews[0].url;
            this.isrc = result.attributes?.isrc;
            this.id = result.id;
        }
        if (vendor === "spotify") {
            this.title = result?.name;
            this.artistName = result?.artists[0]?.name || "";
            this.albumName = result?.album.name;
            this.artworkUrl = result?.album.images[0]?.url || "";
            this.artworkBg = null;
            this.durationMs = result?.duration_ms;
            this.releaseDate = new Date(
                result?.album.release_date
            ).toLocaleDateString("en-US");
            this.previewUrl = result?.preview_url;
            this.isrc = result?.external_ids.isrc;
            this.id = result?.id;
        }
    }
}

export class Album {
    constructor(vendor, result) {
        this.parseMetadata(vendor, result);
    }

    parseMetadata(vendor, result) {
        if (vendor === "appleMusic") {
            this.title = result.attributes?.name;
            this.artistName = result.attributes?.artistName;
            this.albumName = null;
            this.artworkUrl = result.attributes?.artwork.url
                .replace("{w}", 200)
                .replace("{h}", 200);
            this.artworkBg = `#${result.attributes?.artwork.bgColor}`;
            this.durationMs = null;
            this.releaseDate = result.attributes?.releaseDate;
            this.previewUrl = null;
            this.isrc = null;
            this.id = result.id;
        }
        if (vendor === "spotify") {
            this.title = result?.name;
            this.artistName = result?.artists[0].name;
            this.albumName = null;
            this.artworkUrl = result?.images[0]?.url || null;
            this.artworkBg = null;
            this.durationMs = null;
            this.releaseDate = result?.release_date;
            this.previewUrl = null;
            this.isrc = null;
            this.id = result?.id;
        }
    }
}
