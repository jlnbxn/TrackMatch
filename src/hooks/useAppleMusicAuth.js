import { useState, useEffect } from "react";

function useAppleMusicAuth() {
    const [userToken, setUserToken] = useState(null);
    const { MusicKit } = window;

    const handleAuthorization = (e) => {
        setUserToken(MusicKit.getInstance().musicUserToken);
    };

    useEffect(() => {
        window.MusicKit.getInstance().addEventListener(
            "userTokenDidChange",
            handleAuthorization
        );
        return () =>
            window.MusicKit.getInstance().removeEventListener(
                "userTokenDidChange",
                handleAuthorization
            );
    }, []);

    useEffect(() => {
        if (MusicKit.getInstance().isAuthorized) {
            setUserToken(MusicKit.getInstance().musicUserToken);
        }
    }, []);

    return userToken;
}

export default useAppleMusicAuth;
