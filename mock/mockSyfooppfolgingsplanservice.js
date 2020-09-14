const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockOppfolgingsplan = require('./oppfolgingsplan/mockOppfolgingsplan');

const dokumentinfo = { antallSider: 4 };

function mockForLokal(server) {
    server.get('/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(mockOppfolgingsplan.getOppfolgingsplaner());
    });

    server.get('/syfooppfolgingsplanservice/api/internad/v1/oppfolgingsplan/:fnr/historikk', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.HISTORIKKOPPFOLGINGSPLAN]));
    });

    server.get('/syfooppfolgingsplanservice/api/internad/dokument/:id/dokumentinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(dokumentinfo));
    });
}

function mockSyfooppfolgingsplanservice(server) {
    mockForLokal(server);
}

module.exports = mockSyfooppfolgingsplanservice;
