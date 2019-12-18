const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockForLokal(server) {
    server.get('/modiasyforest/api/internad/sykepengesoknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKEPENGESOKNADER]));
    });

    server.get('/modiasyforest/api/internad/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });

    server.get('/modiasyforest/api/internad/naermesteleder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.LEDERE]));
    });

    server.get('/modiasyforest/api/internad/oppfolgingstilfelleperioder', (req, res) => {
        const { orgnummer } = req.query;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.OPPFOLGINGSTILFELLEPERIODER][orgnummer]));
    });

    server.get('/modiasyforest/api/internad/diskresjonskode/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.DISKRESJONSKODE]));
    });

    server.get('/modiasyforest/api/internad/brukerinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.BRUKERINFO]));
    });

    server.get('/modiasyforest/api/internad/veilederoppgaver/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.VEILEDEROPPGAVER]));
    });
}

function mockEndepunkterSomEndrerState(server) {
    server.post('/modiasyforest/api/internad/veilederoppgaver/:id/update', (req, res) => {
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

function mockModiasyforest(server, erLokal) {
    mockForLokal(server);
    if (erLokal) {
        mockEndepunkterSomEndrerState(server);
    }
}

module.exports = mockModiasyforest;
