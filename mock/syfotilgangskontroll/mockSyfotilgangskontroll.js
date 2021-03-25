const mockData = require("../mockData");
const enums = require("../mockDataEnums");

const mockSyfotilgangskoontroll = (server) => {
  server.get("/syfo-tilgangskontroll/api/tilgang/bruker", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.TILGANGTILBRUKER]));
  });
};

module.exports = mockSyfotilgangskoontroll;
