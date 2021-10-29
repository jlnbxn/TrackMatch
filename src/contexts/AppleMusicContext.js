import { createContext, useEffect, useState } from "react";
import AppleMusicApi from "../api/appleMusicApi";
import useAppleMusicAuth from "../hooks/useAppleMusicAuth";

const developerToken = process.env.REACT_APP_APPLE_MUSIC_DEVELOPER_TOKEN;

window.MusicKit.configure({
    developerToken,
    app: {
        name: "TrackMatch",
        build: "0.1",
    },
});

const login = () => {
    window.MusicKit.getInstance().authorize();
    // .then(() => {
    //     setConnected(true)
    // })
    // .catch((error) => console.log(error));
};
const logout = () => {
    window.MusicKit.getInstance().unauthorize();
    // .then(() => {
    //     setConnected(true)
    // })
    // .catch((error) => console.log(error));
};

const allStorefronts = [
    "us",
    "gb",
    "al",
    "dz",
    "ao",
    "ai",
    "ag",
    "ar",
    "am",
    "au",
    "at",
    "az",
    "bs",
    "bh",
    "bb",
    "by",
    "be",
    "bz",
    "bj",
    "bm",
    "bt",
    "bo",
    "bw",
    "br",
    "vg",
    "bn",
    "bg",
    "bf",
    "kh",
    "ca",
    "cv",
    "ky",
    "td",
    "cl",
    "cn",
    "co",
    "cr",
    "hr",
    "cy",
    "cz",
    "cg",
    "dk",
    "dm",
    "do",
    "ec",
    "eg",
    "sv",
    "ee",
    "fm",
    "fj",
    "fi",
    "fr",
    "gm",
    "de",
    "gh",
    "gr",
    "gd",
    "gt",
    "gw",
    "gy",
    "hn",
    "hk",
    "hu",
    "is",
    "in",
    "id",
    "ie",
    "il",
    "it",
    "jm",
    "jp",
    "jo",
    "kz",
    "ke",
    "kg",
    "kw",
    "la",
    "lv",
    "lb",
    "lr",
    "lt",
    "lu",
    "mo",
    "mk",
    "mg",
    "mw",
    "my",
    "ml",
    "mt",
    "mr",
    "mu",
    "mx",
    "md",
    "mn",
    "ms",
    "mz",
    "na",
    "np",
    "nl",
    "nz",
    "ni",
    "ne",
    "ng",
    "no",
    "om",
    "pk",
    "pw",
    "pa",
    "pg",
    "py",
    "pe",
    "ph",
    "pl",
    "pt",
    "qa",
    "tt",
    "ro",
    "ru",
    "kn",
    "lc",
    "vc",
    "st",
    "sa",
    "sn",
    "sc",
    "sl",
    "sg",
    "sk",
    "si",
    "sb",
    "za",
    "kr",
    "es",
    "lk",
    "sr",
    "sz",
    "se",
    "ch",
    "tw",
    "tj",
    "tz",
    "th",
    "tn",
    "tr",
    "tm",
    "tc",
    "ug",
    "ua",
    "ae",
    "gb",
    "us",
    "uy",
    "uz",
    "ve",
    "vn",
    "ye",
    "zw"
]

export const AppleMusicContext = createContext();

const AppleMusicContextProvider = ({ children }) => {
    const [appleMusic, setAppleMusic] = useState({
        name: "appleMusic",
        formattedName: "Apple Music",
        pathName: "/apple-music",
        themeColor: "#F9F9F9",
        allMarkets: allStorefronts,
        login,
        logout,
        api: null,
    });
    const userToken = useAppleMusicAuth();

    const setUserToken = (userToken) => {
        setAppleMusic((appleMusic) => {
            return {
                ...appleMusic,
                api: new AppleMusicApi({
                    developerToken,
                    userToken,
                }),
            };
        });
    };

    useEffect(() => {
        if (!userToken) {
            setAppleMusic((appleMusic) => {
                return {
                    ...appleMusic,
                    api: null,
                };
            });
        } else {
            setUserToken(userToken);
        }
    }, [userToken]);

    const value = {
        appleMusic,
        login,
    };

    return (
        <AppleMusicContext.Provider value={value}>
            {children}
        </AppleMusicContext.Provider>
    );
};

export default AppleMusicContextProvider;
