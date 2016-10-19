const getPort = () => {
    if (window.location.port === '') {
        return '';
    }
    return ':8090';
};

const ContextholderConnection = (brukerId) => {
    const webSocketUrl = `${window.SYFO_SETTINGS.WEBSOCKET_PROTOCOL}://${window.location.hostname}${getPort()}/eventdistributer/websocket/${brukerId}`;
    return new WebSocket(webSocketUrl);
};

function fetchBruker() {
    return fetch(`${window.SYFO_SETTINGS.CONTEXTHOLDER_ROOT}/userid`, {
        credentials: 'include',
    }).then((respons) => {
        return respons.json();
    });
}

const opprettWebsocketConnection = (callback) => {
    return fetchBruker().then((json) => {
        const connection = new ContextholderConnection(json.userid);
        connection.onmessage = (e) => {
            if (e.data === 'OK') {
                return;
            }
            callback(e);
        };
    }).catch((e) => {
        throw new Error('Det oppstod en feil med contextholder', e);
    });
};

export default opprettWebsocketConnection;
