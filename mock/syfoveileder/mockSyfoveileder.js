const mockData = require("../mockData");

const mockSyfoveileder = (server) => {
  server.get("/syfoveileder/api/veileder/self", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.getVeileder()));
  });
};

module.exports = mockSyfoveileder;
