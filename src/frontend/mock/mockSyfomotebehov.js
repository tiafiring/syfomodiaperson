const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/veileder/motebehov', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.MOTEBEHOV]));
    });

    server.get('/veileder/historikk', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.HISTORIKKMOTEBEHOV]));
    });
}

function mockSyfomotebehov(server) {
    mockForLokal(server);
}

module.exports = mockSyfomotebehov;
