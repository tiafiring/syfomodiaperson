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

export function post(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    })
    .then((res) => {
        if (res.status > 400) {
            throw new Error('Forespørsel feilet');
        } else {
            return res;
        }
    })
    .catch((err) => {
        throw err;
    });
}
