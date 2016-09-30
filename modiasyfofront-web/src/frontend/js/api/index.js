export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        throw err;
    });
}
