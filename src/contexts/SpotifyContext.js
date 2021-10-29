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
const allCountries = [
    "AD",
    "AE",
    "AG",
    "AL",
    "AM",
    "AO",
    "AR",
    "AT",
    "AU",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BN",
    "BO",
    "BR",
    "BS",
    "BT",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CH",
    "CI",
    "CL",
    "CM",
    "CO",
    "CR",
    "CV",
    "CW",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ES",
    "FI",
    "FJ",
    "FM",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GH",
    "GM",
    "GN",
    "GQ",
    "GR",
    "GT",
    "GW",
    "GY",
    "HK",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IS",
    "IT",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KR",
    "KW",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "MA",
    "MC",
    "MD",
    "ME",
    "MG",
    "MH",
    "MK",
    "ML",
    "MN",
    "MO",
    "MR",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NE",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PG",
    "PH",
    "PK",
    "PL",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SE",
    "SG",
    "SI",
    "SK",
    "SL",
    "SM",
    "SN",
    "SR",
    "ST",
    "SV",
    "SZ",
    "TD",
    "TG",
    "TH",
    "TL",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "US",
    "UY",
    "UZ",
    "VC",
    "VN",
    "VU",
    "WS",
    "XK",
    "ZA",
    "ZM",
    "ZW"
]

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
        allMarkets: allCountries,
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
