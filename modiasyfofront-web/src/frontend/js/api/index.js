export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        if (res.status > 400) {
            throw new Error('Det oppstod en feil');
        } else {
            return res.json();
        }
    })
    .catch((err) => {
        throw err;
    });
}
