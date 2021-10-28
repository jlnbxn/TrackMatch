import { createContext, useEffect, useState } from "react";
import SpotifyApi from "../api/spotifyApi";
import useSpotifyAuth from "../hooks/useSpotifyAuth";

export const SpotifyContext = createContext();

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
    "user-read-email",
    "user-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
    "streaming",
    "user-library-read",
];

const login = () => {
    const loginUrl =
        "https://accounts.spotify.com/authorize?client_id=" +
        client_id +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri) +
        "&scope=" +
        encodeURIComponent(scopes.join(" ")) +
        "&response_type=code";

    window.location.href = loginUrl;
};

const SpotifyContextProvider = ({ children }) => {
    const logout = () => {
        window.localStorage.removeItem("spotify_access_token");
        window.localStorage.removeItem("spotify_refresh_token");
        setSpotify((spotify) => {
            return {
                ...spotify,
                api: null,
            };
        });
    };

    const [spotify, setSpotify] = useState({
        name: "spotify",
        formattedName: "Spotify",
        pathName: "/spotify",
        themeColor: "#000000",
        login,
        logout,
        api: null,
    });

    const accessToken = useSpotifyAuth();

    const setAccessToken = (access_token) => {
        setSpotify((spotify) => {
            return {
                ...spotify,
                api: new SpotifyApi({
                    client_id,
                    redirect_uri,
                    access_token,
                    scopes,
                }),
            };
        });
    };
    useEffect(() => {
        if (!accessToken) return;
        setAccessToken(accessToken);
    }, [accessToken]);

    const value = { spotify, login };

    return (
        <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
    );
};

export default SpotifyContextProvider;
