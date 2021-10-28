import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const code = new URLSearchParams(window.location.search).get("code");

function useSpotifyAuth() {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    const navigate = useNavigate();

    // If the user comes back, log them in automatically

    useEffect(() => {
        const localRefreshToken = localStorage.getItem("spotify_refresh_token");
        if (!localRefreshToken) return;
        fetch(`/.netlify/functions/spotifyRefresh`, {
            method: "POST",
            body: localRefreshToken,
        })
            .then((res) => res.json())
            .then((res) => {
                setAccessToken(res.access_token);
                localStorage.setItem("spotify_access_token", res.access_token);
                setExpiresIn(res.expires_in);
                setRefreshToken(res.refresh_token);
            })
            .catch((e) => {
                console.log(e);
                // window.location = "/"
            });
    }, []);

    // If the user logs in for the first time, log them in with the code and save their refresh token

    useEffect(() => {
        if (!code) return;
        fetch(`/.netlify/functions/spotify`, {
            method: "POST",
            body: code,
        })
            .then((res) => res.json())
            .then((res) => {
                setAccessToken(res.access_token);
                setExpiresIn(res.expires_in);
                setRefreshToken(res.refresh_token);
                localStorage.setItem("spotify_refresh_token", res.refresh_token);
                localStorage.setItem("spotify_access_token", res.access_token);
                navigate("/spotify");
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code]);

    // If they are logged in, refresh the access token automatically one minute before it expires

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => {
            fetch(`/.netlify/functions/spotifyRefresh`, {
                method: "POST",
                body: refreshToken,
            })
                .then((res) => res.json())
                .then((res) => {
                    setAccessToken(res.access_token);
                    localStorage.setItem("spotify_access_token", res.access_token);
                    setExpiresIn(res.expires_in);
                })
                .catch(() => {
                    window.location = "/";
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}

export default useSpotifyAuth;
