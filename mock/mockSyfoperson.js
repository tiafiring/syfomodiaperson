const mockPersonAdresse = require("./data/mockPersonAdresse");

const NAV_PERSONIDENT_HEADER = "nav-personident";

const diskresjonskode = "7";
const isEgenAnsatt = true;

function mockForLokal(server) {
  server.get("/syfoperson/api/person/diskresjonskode", (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(diskresjonskode);
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });

  server.get("/syfoperson/api/person/egenansatt", (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(isEgenAnsatt));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });

  server.get("/syfoperson/api/person/adresse", (req, res) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(mockPersonAdresse.getPersonAdresse()));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
}

function mockSyfoperson(server) {
  mockForLokal(server);
}

module.exports = mockSyfoperson;
