export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const formatVendor = (vendor) => {
    switch (vendor) {
        case ('appleMusic'):
            return "Apple Music"
        case ('spotify'):
            return "Spotify"
        default:
            return null
    }
}

export const startCase = (string) => {
    let tmp = string.replace(/([A-Z])/g, " $1");
    return tmp.charAt(0).toUpperCase() + tmp.slice(1);
}

export const kebapCase = (string) => {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
