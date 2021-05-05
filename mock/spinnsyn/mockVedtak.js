const mockData = require("../mockData");

const mockVedtak = (server) => {
  server.get("/veileder/vedtak", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(mockData.getVedtak()));
  });
};

module.exports = mockVedtak;
