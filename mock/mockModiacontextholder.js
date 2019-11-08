const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/api/aktivbruker', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.AKTIVBRUKER]));
    });

    server.get('/api/aktivenhet', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.AKTIVENHET]));
    });
}

function mockModiacontextholder(server) {
    mockForLokal(server);
}

module.exports = mockModiacontextholder;
