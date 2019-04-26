const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/brukerinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.BRUKERINFO]));
    });

    server.get('/veilederinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.VEILEDERINFO]));
    });

    server.get('/veilederoppgaver/v1/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.VEILEDEROPPGAVER]));
    });

    server.get('/brukerinfo/:fnr/behandlendeEnhet', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.BEHANDLENDEENHET]));
    });
}

function mockEndepunkterSomEndrerState(server) {
    server.post('/veilederoppgaver/v1/actions/:id', (req, res) => {
        const { id } = req.params;
        const oppdaterteOppgaver = mockData[enums.VEILEDEROPPGAVER].map((oppgave) => {
            if (oppgave.id.toString() === id.toString()) {
                oppgave.status = "FERDIG";
                oppgave.sistEndretAv = "Z990000";
                oppgave.sistEndret = new Date().toString();
            }
        });
        Object.assign(mockData[enums.VEILEDEROPPGAVER], ...oppdaterteOppgaver);

        res.setHeader('Content-Type', 'application/json');
        res.send(id);
    });
}

function mockSyfoveilederoppgaver(server, erLokal) {
    mockForLokal(server);
    if (erLokal) {
        mockEndepunkterSomEndrerState(server);
    }
}

module.exports = mockSyfoveilederoppgaver;
