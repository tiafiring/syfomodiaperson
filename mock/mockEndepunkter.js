const express = require("express");
const mockFastlegerest = require("./fastlegerest/mockFastlegerest");
const mockIspersonoppgave = require("./ispersonoppgave/mockIspersonoppgave");
const mockModiacontextholder = require("./modiacontextholder/mockModiacontextholder");
const mockModiasyforest = require("./modiasyforest/mockModiasyforest");
const mockSyfomoteadmin = require("./syfomoteadmin/mockSyfomoteadmin");
const mockSyfomotebehov = require("./syfomotebehov/mockSyfomotebehov");
const mockSyfooppfolgingsplanservice = require("./syfooppfolgingsplanservice/mockSyfooppfolgingsplanservice");
const mockSyfosoknad = require("./syfosoknad/mockSyfosoknad");
const mockSyfotilgangskoontroll = require("./syfotilgangskontroll/mockSyfotilgangskontroll");
const mockSyfobehandlendeenhet = require("./syfobehandlendeenhet/mockSyfobehandlendeenhet");
const mockSyfoperson = require("./syfoperson/mockSyfoperson");
const mockSyfosmregiser = require("./syfosmregister/mockSyfosmregister");
const mockIspengestopp = require("./ispengestopp/mockIspengestopp");
const mockIsprediksjon = require("./isprediksjon/mockIsprediksjon");
const mockVedtak = require("./spinnsyn/mockVedtak");
const mockIsdialogmote = require("./isdialogmote/mockIsdialogmote");
const mockSyfoveileder = require("./syfoveileder/mockSyfoveileder");

const mockEndepunkter = (server, erLokal) => {
  server.use(express.json());
  server.use(express.urlencoded());

  [
    mockFastlegerest,
    mockIspersonoppgave,
    mockModiacontextholder,
    mockModiasyforest,
    mockSyfomoteadmin,
    mockSyfomotebehov,
    mockSyfooppfolgingsplanservice,
    mockSyfosoknad,
    mockSyfotilgangskoontroll,
    mockSyfobehandlendeenhet,
    mockSyfoperson,
    mockSyfosmregiser,
    mockIspengestopp,
    mockIsprediksjon,
    mockVedtak,
    mockIsdialogmote,
    mockSyfoveileder,
  ].forEach((func) => {
    func(server, erLokal);
  });
};

module.exports = mockEndepunkter;
