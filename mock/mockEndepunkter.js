const express = require('express');
const mockFastlegerest = require('./mockFastlegerest');
const mockModiacontextholder = require('./mockModiacontextholder');
const mockModiasyforest = require('./mockModiasyforest');
const mockSyfomoteadmin = require('./mockSyfomoteadmin');
const mockSyfomotebehov = require('./mockSyfomotebehov');
const mockSyfooppfolgingsplanservice = require('./mockSyfooppfolgingsplanservice');
const mockSyfosoknad = require('./mockSyfosoknad');
const mockSyfotekster = require('./mockSyfotekster');
const mockSyfotilgangskoontroll = require('./mockSyfotilgangskontroll');
const mockSyfoveilederoppgaver = require('./mockSyfoveilederoppgaver');

function mockEndepunkter(server, erLokal) {
    server.use(express.json());
    server.use(express.urlencoded());

    [
        mockFastlegerest,
        mockModiacontextholder,
        mockModiasyforest,
        mockSyfomoteadmin,
        mockSyfomotebehov,
        mockSyfooppfolgingsplanservice,
        mockSyfosoknad,
        mockSyfotekster,
        mockSyfotilgangskoontroll,
        mockSyfoveilederoppgaver,
    ].forEach((func) => {
        func(server, erLokal);
    });
}

module.exports = mockEndepunkter;
