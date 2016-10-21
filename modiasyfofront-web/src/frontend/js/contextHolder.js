const getPort = () => {
    if (window.location.port === '') {
        return '';
    }
    return ':8090';
};

const ContextholderConnection = () => {
    return new WebSocket(`${window.SYFO_SETTINGS.WEBSOCKET_PROTOCOL}://${window.location.hostname}${getPort()}/eventdistributer/websocket`);
};

const opprettWebsocketConnection = (callback) => {
    const connection = new ContextholderConnection();
    connection.onmessage = (e) => {
        if (e.data === 'OK') {
            return;
        }
        callback(e);
    };
    connection.onerror = (e) => {
        callback("onerror");
    };
    connection.onclose = () => {
        callback("onerror");
    };
};

export default opprettWebsocketConnection;
