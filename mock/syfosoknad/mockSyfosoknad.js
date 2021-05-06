const mockData = require("../mockData");

const mockSyfosoknad = (server) => {
  server.get("/syfosoknad/api/veileder/internad/soknader", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.getSoknader()));
  });
};

module.exports = mockSyfosoknad;
