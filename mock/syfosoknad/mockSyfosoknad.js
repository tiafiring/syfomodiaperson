const mockData = require("../mockData");
const enums = require("../mockDataEnums");

const mockSyfosoknad = (server) => {
  server.get("/syfosoknad/api/veileder/internad/soknader", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData[enums.SOKNADER]));
  });
};

module.exports = mockSyfosoknad;
