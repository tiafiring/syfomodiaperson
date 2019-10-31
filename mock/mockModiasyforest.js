const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/modiasyforest/api/sykepengesoknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKEPENGESOKNADER]));
    });

    server.get('/modiasyforest/api/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });

    server.get('/modiasyforest/api/naermesteleder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.LEDERE]));
    });

    server.get('/modiasyforest/api/oppfolgingstilfelleperioder', (req, res) => {
        const { orgnummer } = req.query;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.OPPFOLGINGSTILFELLEPERIODER][orgnummer]));
    });

    server.get('/modiasyforest/api/sykeforloep', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKEFORLOEP]));
    });

    server.get('/modiasyforest/api/diskresjonskode/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.DISKRESJONSKODE]));
    });

    server.get('/modiasyforest/api/egenansatt/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.EGENANSATT]));
    });

    server.get('/modiasyforest/api/brukerinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.BRUKERINFO]));
    })
}

function mockModiasyforest(server) {
    mockForLokal(server);
}

module.exports = mockModiasyforest;
