const getPort = () => {
    if (window.location.port === '') {
        return '';
    }
    return ':8090';
};

const ContextholderConnection = (brukerId) => {
    const webSocketUrl = window.SYFO_SETTINGS.WEBSOCKET_PROTOCOL + '://' + window.location.hostname + getPort('DEV') + '/eventdistributer/websocket/' + brukerId;
    return new WebSocket(webSocketUrl);
};

function fetchBruker() {
    return fetch(window.SYFO_SETTINGS.CONTEXTHOLDER_ROOT + '/userid', {
        credentials: 'include',
    }).then((respons) => {
        return respons.json();
    });
};

const opprettWebsocketConnection = (callback) => {
    return fetchBruker().then((json) => {
        const connection = new ContextholderConnection(json.userid);
        console.log(connection);
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
        }
    })
    .catch(function(){
        callback("onerror");
    });
};

export default opprettWebsocketConnection;
