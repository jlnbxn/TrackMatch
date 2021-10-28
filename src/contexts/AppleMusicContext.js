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

// appleMusicApi.setUserToken(process.env.REACT_APP_APPLE_MUSIC_USER_TOKEN);

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

export const AppleMusicContext = createContext();

const AppleMusicContextProvider = ({ children }) => {
    const [appleMusic, setAppleMusic] = useState({
        name: "appleMusic",
        formattedName: "Apple Music",
        pathName: "/apple-music",
        themeColor: "#F9F9F9",
        login,
        logout,
        api: null,
    });
    const userToken = useAppleMusicAuth();
    console.log(window.MusicKit.getInstance());

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
