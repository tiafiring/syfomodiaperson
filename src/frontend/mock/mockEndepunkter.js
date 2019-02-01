const path = require('path');
const fs = require('fs');
const request = require('request');

const mockData = {};
const SOKNADER = 'soknader';
const SYKEPENGESOKNADER = 'sykepengesoknader';
const BRUKERINFO = 'brukerinfo';
const TEKSTER = 'tekster';

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
        if (err) throw err;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

lastFilTilMinne(SOKNADER);
lastFilTilMinne(SYKEPENGESOKNADER);
lastFilTilMinne(BRUKERINFO);

let teksterFraProd;

function hentTeksterFraProd() {
    const TEKSTER_URL = 'https://syfoapi.nav.no/syfotekster/api/tekster';
    request(TEKSTER_URL, (error, response, body) => {
        if (error) {
            console.log('Kunne ikke hente tekster fra prod', error);
        } else {
            teksterFraProd = JSON.parse(body);
            console.log('Tekster hentet fra prod');
        }
    });
}


function mockTekster(server) {
    const HVERT_FEMTE_MINUTT = 1000 * 60 * 5;
    hentTeksterFraProd();
    setInterval(hentTeksterFraProd, HVERT_FEMTE_MINUTT);

    server.get('/tekster', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teksterFraProd || mockData[TEKSTER]));
    });
}

function mockForLokal(server) {
    mockTekster(server);

    server.get('/brukerinfo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        console.log(mockData[BRUKERINFO]);
        res.send(JSON.stringify(mockData[BRUKERINFO]));
    });

    server.get('/veileder/soknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SOKNADER]));
    });

    server.get('/sykepengesoknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKEPENGESOKNADER]));
    });
}

module.exports = {
    mockForLokal,
};
