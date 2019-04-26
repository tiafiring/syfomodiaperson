const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/sykepengesoknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKEPENGESOKNADER]));
    });

    server.get('/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });

    server.get('/naermesteleder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.LEDERE]));
    });

    server.get('/oppfolgingstilfelleperioder', (req, res) => {
        const { orgnummer } = req.query;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.OPPFOLGINGSTILFELLEPERIODER][orgnummer]));
    });

    server.get('/sykeforloep', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKEFORLOEP]));
    });

    server.get('/diskresjonskode/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.DISKRESJONSKODE]));
    });

    server.get('/egenansatt/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.EGENANSATT]));
    });
}

function mockModiasyforest(server) {
    mockForLokal(server);
}

module.exports = mockModiasyforest;
