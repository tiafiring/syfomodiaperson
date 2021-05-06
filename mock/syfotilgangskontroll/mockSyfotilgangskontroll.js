const mockData = require("../mockData");

const mockSyfotilgangskoontroll = (server) => {
  server.get("/syfo-tilgangskontroll/api/tilgang/bruker", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.getTilgangTilBruker()));
  });
};

module.exports = mockSyfotilgangskoontroll;
