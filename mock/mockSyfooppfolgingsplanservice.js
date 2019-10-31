const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/syfooppfolgingsplanservice/api/oppfoelgingsdialog/v1/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.OPPFOELGINGSDIALOGER]));
    });

    server.get('/syfooppfolgingsplanservice/api/oppfoelgingsdialog/v1/:fnr/historikk', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.HISTORIKKOPPFOLGINGSPLAN]));
    });
}

function mockSyfooppfolgingsplanservice(server) {
    mockForLokal(server);
}

module.exports = mockSyfooppfolgingsplanservice;
