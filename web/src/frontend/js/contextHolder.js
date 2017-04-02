const getPort = () => {
    if (window.location.port === '') {
        return '';
    }
    return ':8090';
};

const ContextholderConnection = () => {
    return new WebSocket(`${window.APP_SETTINGS.WEBSOCKET_PROTOCOL}://${window.location.hostname}${getPort()}/modiaeventdistribution/websocket`);
};

export const opprettWebsocketConnection = (callback) => {
    const connection = new ContextholderConnection();
    connection.onmessage = (e) => {
        console.log(e.data);
        if (e.data === 'Connection Established') {
            return;
        }
        callback(e);
    };
    connection.onerror = () => {
        callback('onerror');
    };
    connection.onclose = () => {
        callback('onerror');
    };
};
