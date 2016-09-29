export function get(url) {
    return fetch(url)
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            throw err;
        });
}
